import { TelegramContextModel } from '../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { Inject } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../repository/user/user.repository.interface';
import { ChannelLinkInterface } from '../../../model/link/channel.link.interface';
import { UserManagerInterface } from '../../../manager/user/user.manager.interface';
import {
	ADD_CHANNEL_CATEGORY,
	EDIT_PROMPT,
	IMPROVE_LIMITS,
	MAIN_CHANNEL_PAGE,
	MAIN_CHANNELS_TO_REWRITE_PAGE,
	SUPPORT,
} from '../pages.types';
import { DIConstants, USER_MANAGER, USER_REPOSITORY } from '../../../constants/DI.constants';
import { UserChannelInterface } from '../../../client/storage/storage.model';

export interface MainChannelSceneInterface extends Record<string, any> {
	userChannels: UserChannelInterface[];
	countToJoinMainPage: number;
	currentPrompt: string;
}

export type MainChannelSceneContext = TelegramContextModel & StepContext<MainChannelSceneInterface>;

@Scene(MAIN_CHANNEL_PAGE)
export class MainChannel {
	constructor(
		@Inject(DIConstants.UserManager) private userManager: UserManagerInterface,
		@Inject(DIConstants.UserRepository) private repository: UserRepositoryInterface,
	) {}

	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: MainChannelSceneContext) {
		if (telegramContext.scene.step.firstTime) {
			let user = await this.repository.findOne({
				user: {
					id: telegramContext.from.id,
				},
			});
			if (!user) {
				try {
					user = await this.userManager.create({
						user: {
							id: telegramContext.from.id,
						},
					});
					telegramContext.scene.state.userChannels = user.user.userChannels;
				} catch (e) {
					telegramContext.send('На сервере ведутся технические работы');
				}
			}
		}
	}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: MainChannelSceneContext) {
		const defaultMessage =
			telegramContext.scene.state.countToJoinMainPage === 1
				? 'Для того, чтобы начать работу вам нужно добавить основные каналы для которых будет генерироваться контент. \n' +
				  '\n' +
				  'Нажмите кнопку «Добавить основной канал» и выберите его категорию из предложенных. После этого отправьте ссылку на канал. \n' +
				  '\n' +
				  'Категория, впоследствии, будет отображаться в меню рядом с каналом.'
				: 'Выберите дальнейшее действие:';
		//Проверяем, выбрал ли пользователь канал из ему предложенных
		if (
			telegramContext.scene.state.userChannels
				.map((chn) => (chn.userChannel as ChannelLinkInterface).link)
				.includes(telegramContext.text.replace(`◽️ `, ''))
		) {
			const foundUserChannel: UserChannelInterface = telegramContext.scene.state.userChannels.find(
				(chn) =>
					(chn.userChannel as ChannelLinkInterface).link ===
					telegramContext.text.replace(`◽️ `, ''),
			);
			return telegramContext.scene.enter(MAIN_CHANNELS_TO_REWRITE_PAGE, {
				state: {
					foundUserChannel: foundUserChannel,
					currentPrompt: telegramContext.scene.state.currentPrompt
						? telegramContext.scene.state.currentPrompt
						: '',
				},
			}); //УРАА, УДАЛОСЬ ПРОКИНУТЬ
		}
		telegramContext.scene.state.countToJoinMainPage = 0;
		//
		//ПЕРЕВОДИМ НА ДРУГУЮ СЦЕНУ, ИЛИ ШАГ, ГДЕ ДОБАВЛЯЕТ КАНАЛ, А ЗАТЕМ НАЗАД ИДЁМ
		const channels = telegramContext.scene.state.userChannels;
		const channelsCount = telegramContext.scene.state.userChannels.length;

		const channelsLimit = 3; //ЛИМИТ ЗАХАРЖКОЖЕНО!, С БИЛЛИНГ СЕРВИСА

		const channelKeyboard = channels.map((chn) => {
			return [{ text: `◽️ ${(chn.userChannel as ChannelLinkInterface).link}` }];
		});

		const addChannelKeyboard = [[{ text: 'Добавить категорию' }]];
		const limitKeyboard = [[{ text: 'Повысить лимит' }]];
		const techSupport = [[{ text: 'Техническая поддержка' }]];

		const editPromptKeyboard = [[{ text: 'Изменить промпт' }]];

		let mainKeyboard = [];
		if (channelsCount === channelsLimit) {
			mainKeyboard = [...limitKeyboard, ...channelKeyboard, ...techSupport];
		}
		if (channelsCount > 0 && channelsCount < channelsLimit) {
			mainKeyboard = [...addChannelKeyboard, ...channelKeyboard, ...techSupport];
		}
		if (channelsCount === 0) {
			mainKeyboard = [...addChannelKeyboard, ...techSupport];
		}

		switch (telegramContext.text) {
			case 'Изменить промпт':
				return await telegramContext.scene.enter(EDIT_PROMPT);
			case 'Добавить категорию':
				return await telegramContext.scene.enter(ADD_CHANNEL_CATEGORY, {
					state: {
						userChannels: telegramContext.scene.state.userChannels,
					},
				});
			case 'Повысить лимит':
				return await telegramContext.scene.enter(IMPROVE_LIMITS, {
					state: {
						flag: 'MAIN_CHANNEL',
					},
				});
			case 'Техническая поддержка':
				return await telegramContext.scene.enter(SUPPORT, {
					state: {
						supportFlag: 'mainChannel',
					},
				});
			default:
				return await telegramContext.send(defaultMessage, {
					reply_markup: {
						resize_keyboard: true,
						remove_keyboard: true,
						keyboard: [...editPromptKeyboard, ...mainKeyboard],
					},
				});
		}
	}
}

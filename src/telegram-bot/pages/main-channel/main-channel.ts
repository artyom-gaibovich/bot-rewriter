import { TelegramContextModel } from '../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { Inject } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../repository/user/user.repository.interface';
import { ChannelLinkInterface } from '../../../model/link/channel.link.interface';
import { UserManagerInterface } from '../../../manager/user/user.manager.interface';
import { DIConstants } from '../../../constants/DI.constants';
import { UserChannelInterface } from '../../../client/storage/storage.model';
import { MainChannelConfig } from '../../../config/pages/main-channel.config';

export interface MainChannelSceneInterface extends Record<string, any> {
	userChannels: UserChannelInterface[];
	countToJoinMainPage: number;
	currentPrompt: string;
}

export type MainChannelSceneContext = TelegramContextModel & StepContext<MainChannelSceneInterface>;

@Scene(DIConstants.MainChannel)
export class MainChannel {
	constructor(
		@Inject(DIConstants.UserManager) private userManager: UserManagerInterface,
		@Inject(DIConstants.UserRepository) private repository: UserRepositoryInterface,
		@Inject(DIConstants.MainChannelConfig) private config: MainChannelConfig,
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
					await telegramContext.send(this.config.isNotWork);
				}
			}
		}
	}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: MainChannelSceneContext) {
		const defaultMessage =
			telegramContext.scene.state.countToJoinMainPage === 1
				? this.config.startMessage
				: this.config.chooseNextAction;
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

			return telegramContext.scene.enter(DIConstants.MainChannelToRewrite, {
				state: {
					foundUserChannel: foundUserChannel,
					currentPrompt: telegramContext.scene.state.currentPrompt
						? telegramContext.scene.state.currentPrompt
						: '',
				},
			});
		}
		telegramContext.scene.state.countToJoinMainPage = 0;
		//
		//ПЕРЕВОДИМ НА ДРУГУЮ СЦЕНУ, ИЛИ ШАГ, ГДЕ ДОБАВЛЯЕТ КАНАЛ, А ЗАТЕМ НАЗАД ИДЁМ
		const channels = telegramContext.scene.state.userChannels;
		const channelsCount = telegramContext.scene.state.userChannels.length;

		const channelsLimit = this.config.channelsLimit;

		const channelKeyboard = channels.map((chn) => {
			return [{ text: `◽️ ${(chn.userChannel as ChannelLinkInterface).link}` }];
		});

		const addChannelKeyboard = [[{ text: this.config.addCategory }]];
		const limitKeyboard = [[{ text: this.config.improveLimits }]];
		const techSupport = [[{ text: this.config.support }]];

		const editPromptKeyboard = [[{ text: this.config.changePrompt }]];

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
			case this.config.changePrompt:
				return await telegramContext.scene.enter(DIConstants.EditPrompt);
			case this.config.addCategory:
				return await telegramContext.scene.enter(DIConstants.AddChannelCategory, {
					state: {
						userChannels: telegramContext.scene.state.userChannels,
					},
				});
			case this.config.improveLimits:
				return await telegramContext.scene.enter(DIConstants.ImproveLimits, {
					state: {
						flag: 'MAIN_CHANNEL',
					},
				});
			case this.config.support:
				return await telegramContext.scene.enter(DIConstants.Support, {
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

import { TelegramContextModel } from '../../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { Inject } from '@nestjs/common';
import { ChannelManagerInterface } from '../../../../manager/channel/channel.manager.interface';
import { LinkValidatorInterface } from '../../../../validator/link.validator.interface';
import { ADD_CHANNEL_CATEGORY, ADD_USER_CHANNEL_PAGE, MAIN_CHANNEL_PAGE } from '../../pages.types';
import { CHANNEL_MANAGER, LINK_VALIDATOR } from '../../../../constants/DI.constants';
import { UserChannelInterface } from '../../../../model/channel.interface';
import { ChannelLinkInterface } from '../../../../model/link/channel.link.interface';

export interface AddUserChannelSceneInterface extends Record<string, any> {
	category: CategoryInterface;
	userChannels: UserChannelInterface[];
}

export type AddUserChannelSceneContext = TelegramContextModel &
	StepContext<AddUserChannelSceneInterface>;

@Scene(ADD_USER_CHANNEL_PAGE)
export class AddUserChannel {
	constructor(
		@Inject(LINK_VALIDATOR) private linkValidator: LinkValidatorInterface,
		@Inject(CHANNEL_MANAGER) private channelManager: ChannelManagerInterface,
	) {}

	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: AddUserChannelSceneContext) {}
	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: AddUserChannelSceneContext) {
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(`Отправьте ссылку на ваш телеграм канал`, {
				reply_markup: {
					remove_keyboard: true,
					resize_keyboard: true,
					keyboard: [[{ text: 'Вернуться обратно' }]],
				},
			});
		}
		if (telegramContext.text === 'Вернуться обратно') {
			return await telegramContext.scene.enter(MAIN_CHANNEL_PAGE);
		} else {
			let error = 'Канал не был добавлен, отправьте в корректном формате';
			console.log(
				telegramContext.scene.state.userChannels.map(
					(chn) => (chn.userChannel as ChannelLinkInterface).link,
				),
			);
			if (
				telegramContext.scene.state.userChannels
					.map((chn) => (chn.userChannel as ChannelLinkInterface).link)
					.includes(telegramContext.text)
			) {
				error = 'Вы уже добавили этот канал';
				return await telegramContext.send(error, {
					reply_markup: {
						resize_keyboard: true,
						keyboard: [[{ text: 'Вернуться обратно' }]],
					},
				});
			}
			if (this.linkValidator.validate({ link: telegramContext.text })) {
				const result = await this.channelManager.addChannel({
					user: {
						id: telegramContext.from.id,
						userChannels: [
							{
								userChannel: { link: `${telegramContext.text}` }, //| ${telegramContext.scene.state.category.title}
							},
						],
					},
				});
				await telegramContext.send('Канал был успешно добавлен!', {
					reply_markup: {
						one_time_keyboard: true,
						remove_keyboard: true,
					},
				});

				return await telegramContext.scene.enter(MAIN_CHANNEL_PAGE);
			} else {
				return await telegramContext.send(error, {
					reply_markup: {
						resize_keyboard: true,
						keyboard: [[{ text: 'Вернуться обратно' }]],
					},
				});
			}
		}
	}
}

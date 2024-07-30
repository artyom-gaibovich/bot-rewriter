import { TelegramContextModel } from '../../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { Inject } from '@nestjs/common';
import { ChannelManagerInterface } from '../../../../manager/channel/channel.manager.interface';
import { LinkValidatorInterface } from '../../../../validator/link.validator.interface';
import { ADD_USER_CHANNEL_PAGE, MAIN_CHANNEL_PAGE } from '../../pages.types';
import { CHANNEL_MANAGER, DIConstants, LINK_VALIDATOR } from '../../../../constants/DI.constants';
import { ChannelLinkInterface } from '../../../../model/link/channel.link.interface';
import { CategoryInterface, UserChannelInterface } from '../../../../client/storage/storage.model';
import { AddUserChannelConfig } from './add-user-channel.config'; // Импортируем конфиг

export interface AddUserChannelSceneInterface extends Record<string, any> {
	category: CategoryInterface;
	userChannels: UserChannelInterface[];
}

export type AddUserChannelSceneContext = TelegramContextModel &
	StepContext<AddUserChannelSceneInterface>;

@Scene(DIConstants.AddUserChannel) // Обновляем декоратор
export class AddUserChannel {
	constructor(
		@Inject(LINK_VALIDATOR) private linkValidator: LinkValidatorInterface,
		@Inject(DIConstants.ChannelManager) private channelManager: ChannelManagerInterface,
		@Inject(DIConstants.AddUserChannelConfig) private config: AddUserChannelConfig, // Внедряем конфиг
	) {}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: AddUserChannelSceneContext): Promise<unknown> {
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(this.config.requestLinkMessage, {
				reply_markup: {
					remove_keyboard: true,
					resize_keyboard: true,
					keyboard: [[{ text: this.config.goBackButton }]],
				},
			});
		}

		if (telegramContext.text === this.config.goBackButton) {
			return await telegramContext.scene.enter(DIConstants.MainChannel);
		} else {
			let error = this.config.channelNotAddedError;
			const userChannelLinks = telegramContext.scene.state.userChannels.map(
				(chn) => (chn.userChannel as ChannelLinkInterface).link,
			);

			if (userChannelLinks.includes(telegramContext.text)) {
				error = this.config.channelAlreadyAddedError;
				return await telegramContext.send(error, {
					reply_markup: {
						resize_keyboard: true,
						keyboard: [[{ text: this.config.goBackButton }]],
					},
				});
			}

			if (this.linkValidator.validate({ link: telegramContext.text })) {
				await this.channelManager.create({
					user: {
						id: telegramContext.from.id,
						userChannels: [
							{
								userChannel: { link: `${telegramContext.text}` },
							},
						],
					},
				});
				await telegramContext.send(this.config.successMessage, {
					reply_markup: {
						one_time_keyboard: true,
						remove_keyboard: true,
					},
				});

				return await telegramContext.scene.enter(DIConstants.MainChannel);
			} else {
				return await telegramContext.send(error, {
					reply_markup: {
						resize_keyboard: true,
						keyboard: [[{ text: this.config.goBackButton }]],
					},
				});
			}
		}
	}
}

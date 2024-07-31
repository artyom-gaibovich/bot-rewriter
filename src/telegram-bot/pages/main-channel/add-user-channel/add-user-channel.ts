import { TelegramContextModel } from '../../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene } from 'nestjs-puregram';
import { Inject, UseInterceptors } from '@nestjs/common';
import { ChannelManagerInterface } from '../../../../manager/channel/channel.manager.interface';
import { LinkValidatorInterface } from '../../../../validator/link.validator.interface';
import { DIConstants } from '../../../../constants/DI.constants';
import { ChannelLinkInterface } from '../../../../model/link/channel.link.interface';
import { CategoryInterface, UserChannelInterface } from '../../../../client/storage/storage.model';
import { AddUserChannelConfig } from './add-user-channel.config';
import { ErrorInterceptor } from '../../../../interceptors/telegram-bot.interceptor'; // Импортируем конфиг

export interface AddUserChannelSceneInterface extends Record<string, any> {
	category: CategoryInterface;
	userChannels: UserChannelInterface[];
}

export type AddUserChannelSceneContext = TelegramContextModel &
	StepContext<AddUserChannelSceneInterface>;

@Scene(DIConstants.AddUserChannel) // Обновляем декоратор
export class AddUserChannel {
	constructor(
		@Inject(DIConstants.LinkValidator) private linkValidator: LinkValidatorInterface,
		@Inject(DIConstants.ChannelManager) private channelManager: ChannelManagerInterface,
		@Inject(DIConstants.AddUserChannelConfig) private config: AddUserChannelConfig, // Внедряем конфиг
	) {}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: AddUserChannelSceneContext): Promise<unknown> {
		try {
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
					const result = await this.channelManager.create({
						user: {
							id: telegramContext.from.id,
							userChannels: [
								{
									userChannel: { link: `${telegramContext.text}` },
								},
							],
						},
					});
					if (!result) {
						return await telegramContext.send(this.config.error);
					}
					await telegramContext.send(this.config.successMessage, {
						reply_markup: {
							one_time_keyboard: true,
							remove_keyboard: true,
						},
					});

					return await telegramContext.scene.enter(DIConstants.MainChannel);
				} else {
					return await telegramContext.send(this.config.error, {
						reply_markup: {
							resize_keyboard: true,
							keyboard: [[{ text: this.config.goBackButton }]],
						},
					});
				}
			}
		} catch (e) {
			return await telegramContext.send(this.config.error);
		}
	}
}

import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { TelegramContextModel } from '../../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { ChannelLinkInterface } from '../../../../model/link/channel.link.interface';
import { Inject, UseInterceptors } from '@nestjs/common';
import { ChannelManagerInterface } from '../../../../manager/channel/channel.manager.interface';
import { ChannelCheckerInterface } from '../../../../checker/channel.checker.interface';
import { UserChannelInterface } from '../../../../client/storage/storage.model';
import { DIConstants } from '../../../../constants/DI.constants';
import { AddChannelToRewriteConfig } from './add-channel-to-rewrite.config';

export interface AddUserChannelSceneInterface extends Record<string, any> {
	isChannelExists: boolean;
	foundUserChannel: UserChannelInterface;
	foundChannelToRewrite: ChannelLinkInterface;
	channelsToRewrite: ChannelLinkInterface[];
}

export type AddUserChannelSceneContext = TelegramContextModel &
	StepContext<AddUserChannelSceneInterface>;

@Scene(DIConstants.AddChannelToRewrite) // Обновляем декоратор
export class AddChannelToRewrite {
	constructor(
		@Inject(DIConstants.ChannelManager) private channelManager: ChannelManagerInterface,
		@Inject(DIConstants.ChannelChecker) private checker: ChannelCheckerInterface,
		@Inject(DIConstants.AddChannelToRewriteConfig) private config: AddChannelToRewriteConfig, // Внедряем конфиг
	) {}

	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: AddUserChannelSceneContext) {
		if (telegramContext.scene.step.firstTime) {
			telegramContext.scene.state.isChannelExists = false;
		}
	}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: AddUserChannelSceneContext) {
		const foundUserChannel = telegramContext.scene.state.foundUserChannel;
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(this.config.requestLinkMessage, {
				reply_markup: {
					resize_keyboard: true,
					keyboard: [[{ text: this.config.cancelButton }]],
				},
			});
		}
		if (telegramContext.text === this.config.cancelButton) {
			return await telegramContext.scene.enter(DIConstants.MainChannelToRewrite, {
				state: {
					foundUserChannel: foundUserChannel,
				},
			});
		} else {
			if (
				telegramContext.scene.state.channelsToRewrite
					.map((chn) => chn.link)
					.includes(telegramContext.text)
			) {
				return await telegramContext.send(this.config.alreadyAddedMessage, {
					reply_markup: {
						resize_keyboard: true,
						keyboard: [[{ text: this.config.cancelButton }]],
					},
				});
			}
			const isChannelExists = (await this.checker.check([{ link: telegramContext.text }]))
				.checkedChannels[0].isChannelExists;

			if (isChannelExists) {
				const result = await this.channelManager.create({
					user: {
						id: telegramContext.from.id,
						userChannels: [
							{
								userChannel: {
									link: (foundUserChannel.userChannel as ChannelLinkInterface).link,
									id: (foundUserChannel.userChannel as ChannelLinkInterface).id,
								},
								channelsToRewrite: [{ link: telegramContext.text }],
							},
						],
					},
				});
				const newChannel = result.user.userChannels.find(
					(chn) =>
						(chn.userChannel as ChannelLinkInterface).link ===
						(foundUserChannel.userChannel as ChannelLinkInterface).link,
				);
				const currentChannelToRewrite = newChannel.channelsToRewrite.find(
					(chn) => chn.link === telegramContext.text,
				);
				return await telegramContext.scene.enter(DIConstants.MainChannelToRewrite, {
					state: {
						foundChannelToRewrite: currentChannelToRewrite,
						foundUserChannel: newChannel,
					},
				});
			} else {
				return await telegramContext.send(this.config.notAddedMessage, {
					reply_markup: {
						resize_keyboard: true,
						keyboard: [[{ text: this.config.cancelButton }]],
					},
				});
			}
		}
	}
}

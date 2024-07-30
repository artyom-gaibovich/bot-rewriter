import { TelegramContextModel } from '../../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { Inject } from '@nestjs/common';
import { ChannelManagerInterface } from '../../../../manager/channel/channel.manager.interface';
import { ChannelLinkInterface } from '../../../../model/link/channel.link.interface';
import { DIConstants } from '../../../../constants/DI.constants';
import { UserChannelInterface } from '../../../../client/storage/storage.model';
import { DeleteUserChannelConfig } from '../../../../config/pages/delete-user-channel';

export interface DeleteUserChannelSceneInterface extends Record<string, any> {
	userChannelToDelete: UserChannelInterface;
}

export type DeleteUserChannelSceneContext = TelegramContextModel &
	StepContext<DeleteUserChannelSceneInterface>;

@Scene(DIConstants.DeleteUserChannel)
export class DeleteUserChannel {
	constructor(
		@Inject(DIConstants.ChannelManager) private channelManager: ChannelManagerInterface,
		@Inject(DIConstants.DeleteUserChannelConfig) private config: DeleteUserChannelConfig, // Внедряем конфиг
	) {}

	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: DeleteUserChannelSceneContext) {
		if (telegramContext.scene.step.firstTime) {
			telegramContext.scene.state.isChannelAdded = false;
		}
	}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: DeleteUserChannelSceneContext) {
		const userChannelToDelete = telegramContext.scene.state.userChannelToDelete;
		const link = (userChannelToDelete.userChannel as ChannelLinkInterface).link;
		const confirmationMessage = this.config.confirmationMessage.replace('{link}', link);
		const deletionSuccessMessage = this.config.deletionSuccessMessage.replace('{link}', link);

		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(confirmationMessage, {
				reply_markup: {
					keyboard: [[{ text: this.config.cancelButton }], [{ text: this.config.deleteButton }]],
					resize_keyboard: true,
				},
			});
		}

		switch (telegramContext.text) {
			case this.config.cancelButton:
				return await telegramContext.scene.enter(DIConstants.MainChannelsToRewrite, {
					state: {
						foundUserChannel: userChannelToDelete,
					},
				});
			case this.config.deleteButton:
				await this.channelManager.delete({
					user: {
						id: telegramContext.from.id,
						userChannels: [userChannelToDelete],
					},
				});
				await telegramContext.send(deletionSuccessMessage);
				return telegramContext.scene.enter(DIConstants.MainChannel);
			default:
				return await telegramContext.send(confirmationMessage, {
					reply_markup: {
						keyboard: [[{ text: this.config.cancelButton }], [{ text: this.config.deleteButton }]],
						resize_keyboard: true,
					},
				});
		}
	}
}

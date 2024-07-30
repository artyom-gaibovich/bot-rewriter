import { TelegramContextModel } from '../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { Inject } from '@nestjs/common';
import { ChannelManagerInterface } from '../../../manager/channel/channel.manager.interface';
import { ChannelLinkInterface } from '../../../model/link/channel.link.interface';
import { DIConstants } from '../../../constants/DI.constants';
import { MainChannelToRewriteConfig } from './main-channel-to-rewrite.config';

export interface MainChannelToRewriteSceneInterface extends Record<string, any> {
	isChannelAdded: boolean;
	foundUserChannel: ChannelLinkInterface;
	foundChannelToRewrite: ChannelLinkInterface;
}

export type MainChannelToRewriteSceneContext = TelegramContextModel &
	StepContext<MainChannelToRewriteSceneInterface>;

@Scene(DIConstants.MainChannelToRewrite)
export class MainChannelToRewrite {
	constructor(
		@Inject(DIConstants.MainChannelToRewriteConfig) private config: MainChannelToRewriteConfig,
		@Inject(DIConstants.ChannelManager) private channelManager: ChannelManagerInterface,
	) {}

	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: MainChannelToRewriteSceneContext) {
		if (telegramContext.scene.step.firstTime) {
			// Initialize any necessary state or perform setup tasks
		}
	}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: MainChannelToRewriteSceneContext) {
		const { foundChannelToRewrite, foundUserChannel } = telegramContext.scene.state;

		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(
				this.config.initialMessage.replace(
					'${foundChannelToRewrite.link}',
					foundChannelToRewrite.link,
				),
				{
					reply_markup: {
						resize_keyboard: true,
						keyboard: [
							[{ text: this.config.backButton }],
							[{ text: this.config.deleteSubChannelButton }],
						],
					},
				},
			);
		}

		if (telegramContext.text === this.config.backButton) {
			return await telegramContext.scene.enter(DIConstants.MainChannelsToRewrite, {
				state: {
					foundUserChannel: foundUserChannel,
				},
			});
		}

		if (telegramContext.text === this.config.deleteSubChannelButton) {
			const result = await this.channelManager.deleteSecondary({
				user: {
					id: telegramContext.from.id,
					userChannels: [
						{
							userChannel: {},
							channelsToRewrite: [foundChannelToRewrite],
						},
					],
				},
			});

			const currentUserChannel = result.user.userChannels.find(
				(chn) => (chn.userChannel as ChannelLinkInterface).id === foundUserChannel.userChannel.id,
			);

			await telegramContext.send(this.config.deleteSubChannelMessage);

			return await telegramContext.scene.enter(DIConstants.MainChannelsToRewrite, {
				state: {
					channelsToRewrite: currentUserChannel.channelsToRewrite,
					foundUserChannel: currentUserChannel,
				},
			});
		}
	}
}

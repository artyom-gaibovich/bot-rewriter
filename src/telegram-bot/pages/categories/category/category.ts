import { CategoryInterface, UserChannelInterface } from '../../../../client/storage/storage.model';
import { TelegramContextModel } from '../../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene } from 'nestjs-puregram';
import { DIConstants } from '../../../../constants/DI.constants';
import { Inject } from '@nestjs/common';
import { ChannelManagerInterface } from '../../../../manager/channel/channel.manager.interface';
import { CategoryConfig } from './category.config';

export interface CategorySceneInterface extends Record<string, any> {
	category: CategoryInterface;
}

export type CategoryContext = TelegramContextModel & StepContext<CategorySceneInterface>;

@Scene(DIConstants.Category)
export class Category {
	constructor(
		@Inject(DIConstants.ChannelManager) private channelManager: ChannelManagerInterface,
		@Inject(DIConstants.CategoryConfig) private config: CategoryConfig,
	) {}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: CategoryContext): Promise<unknown> {
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
		} catch (e) {
			return await telegramContext.send(this.config.error);
		}
	}
}

import { CategoryInterface, UserChannelInterface } from '../../../../client/storage/storage.model';
import { TelegramContextModel } from '../../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene } from 'nestjs-puregram';
import { DIConstants } from '../../../../constants/DI.constants';
import { Inject } from '@nestjs/common';
import { LinkValidatorInterface } from '../../../../validator/link.validator.interface';
import { ChannelManagerInterface } from '../../../../manager/channel/channel.manager.interface';
import { AddUserChannelConfig } from '../../main-channel/add-user-channel/add-user-channel.config';
import { ChannelLinkInterface } from '../../../../model/link/channel.link.interface';
import { Category } from '../category/category';
import { CategoriesConfig } from '../categories.config';
import { AddCategoryConfig } from './add-category.config';
import { CategoryServiceInterface } from '../../../../client/storage/category/category.service.interface';

export interface AddUserChannelSceneInterface extends Record<string, any> {
	data: string;
}

export type AddUserChannelSceneContext = TelegramContextModel &
	StepContext<AddUserChannelSceneInterface>;

@Scene(DIConstants.AddUserChannel) // Обновляем декоратор
export class AddUserChannel {
	constructor(
		@Inject(DIConstants.AddCategoryConfig) private config: AddCategoryConfig,
		@Inject(DIConstants.CategoryManager) private categoryManager: 'EMPTY', // 'TODO MAKE IT',
	) {}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: AddUserChannelSceneContext): Promise<unknown> {
		try {
			if (telegramContext.scene.step.firstTime) {
				return await telegramContext.send(this.config.startMessage, {
					reply_markup: {
						remove_keyboard: true,
						resize_keyboard: true,
						keyboard: [[{ text: this.config.backButton }]],
					},
				});
			}

			if (telegramContext.text === this.config.backButton) {
				return await telegramContext.scene.enter(DIConstants.Categories);
			} else {
			}
		} catch (e) {
			return await telegramContext.send(this.config.errorMessage);
		}
	}
}

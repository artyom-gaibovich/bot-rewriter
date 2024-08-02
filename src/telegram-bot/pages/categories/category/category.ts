import { TelegramContextModel } from '../../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene } from 'nestjs-puregram';
import { DIConstants } from '../../../../constants/DI.constants';
import { Inject } from '@nestjs/common';
import { CategoryConfig } from './category.config';
import { CategoryInterface } from '../../../../client/storage/category/category.service.interface';
import { CategoryManagerInterface } from '../../../../manager/category/category.manager.interface';

export interface CategorySceneInterface extends Record<string, any> {
	category: CategoryInterface;
}

export type CategoryContext = TelegramContextModel & StepContext<CategorySceneInterface>;

@Scene(DIConstants.Category)
export class Category {
	constructor(
		@Inject(DIConstants.CategoryManager) private categoryManager: CategoryManagerInterface,
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
						keyboard: [
							[
								{ text: this.config.goBackButton },
								{ text: this.config.editCategory },
								{ text: this.config.deleteCategory },
							],
						],
					},
				});
			}
			if (telegramContext.text === this.config.goBackButton) {
				return await telegramContext.scene.enter(DIConstants.Categories);
			}
			if (telegramContext.text === this.config.deleteCategory) {
				const category = telegramContext.scene.state.category;
				const result = await this.categoryManager.delete({
					categories: category,
				});
				if (!result) {
					return await telegramContext.send(this.config.error);
				}
				return await telegramContext.scene.enter(DIConstants.Categories);
			}
			if (telegramContext.text === this.config.editCategory) {
				return await telegramContext.scene.enter(DIConstants.EditCategory, {
					state: {
						category: telegramContext.scene.state.category,
					},
				});
			}
		} catch (e) {
			return await telegramContext.send(this.config.error);
		}
	}
}

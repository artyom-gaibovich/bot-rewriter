import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { Inject } from '@nestjs/common';
import { CategoryRepositoryInterface } from '../../../../../repository/category/category.repository.interface';
import { TelegramContextModel } from '../../../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { DIConstants } from '../../../../../constants/DI.constants';
import {
	CategoryInterface,
	UserChannelInterface,
} from '../../../../../client/storage/storage.model';
import { AddChannelCategoryConfig } from './add-channel-category.config'; // Импортируем конфиг

export interface AddChannelCategoryInterface extends Record<string, any> {
	categories: CategoryInterface[];
	limit: number;
	currentPage: number;
	userChannels: UserChannelInterface[];
}

export type AddChannelCategoryContext = TelegramContextModel &
	StepContext<AddChannelCategoryInterface>;

@Scene(DIConstants.AddChannelCategory) // Обновляем декоратор
export class AddChannelCategory {
	constructor(
		@Inject(DIConstants.CategoryRepository) private repository: CategoryRepositoryInterface,
		@Inject(DIConstants.AddChannelCategoryConfig) private config: AddChannelCategoryConfig, // Внедряем конфиг
	) {}

	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: AddChannelCategoryContext) {
		if (telegramContext.scene.step.firstTime) {
			telegramContext.scene.state.categories = [...(await this.repository.findAll()).categories];

			telegramContext.scene.state.limit = 17; // specify your limit
			telegramContext.scene.state.currentPage = 0;
			return await this.showCategories(telegramContext);
		}
	}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: AddChannelCategoryContext) {
		if (telegramContext.text === this.config.nextButton) {
			telegramContext.scene.state.currentPage++;
			return await this.showCategories(telegramContext);
		}
		if (telegramContext.text === this.config.backButton) {
			telegramContext.scene.state.currentPage--;
			return await this.showCategories(telegramContext);
		}
		if (telegramContext.text === this.config.exitButton) {
			return await telegramContext.scene.enter(DIConstants.MainChannel);
		}
		if (
			telegramContext.text !== this.config.addCategoryButton &&
			telegramContext.scene.state.categories.map((chn) => chn.title).includes(telegramContext.text)
		) {
			return await telegramContext.scene.enter(DIConstants.AddUserChannel, {
				state: {
					category: telegramContext.scene.state.categories.find(
						(cat) => cat.title === telegramContext.text,
					),
					userChannels: telegramContext.scene.state.userChannels,
				},
			});
		}
		if (!telegramContext.scene.step.firstTime) {
			return await this.showCategories(telegramContext);
		}
	}

	private async showCategories(telegramContext: AddChannelCategoryContext) {
		const { categories, limit, currentPage } = telegramContext.scene.state;
		const startIndex = currentPage * limit;
		const endIndex = startIndex + limit;
		const categoriesForPage = categories.slice(startIndex, endIndex);

		let mainKeyboard = [];
		if (currentPage === 0) {
			mainKeyboard = [
				...categoriesForPage.map((category) => [{ text: `${category.title}` }]),
				[{ text: this.config.nextButton }],
				[{ text: this.config.exitButton }],
			];
		} else {
			if (categoriesForPage.length !== limit) {
				mainKeyboard = [
					...categoriesForPage.map((category) => [{ text: category.title }]),
					[{ text: this.config.backButton }],
					[{ text: this.config.exitButton }],
				];
			} else {
				mainKeyboard = [
					...categoriesForPage.map((category) => [{ text: category.title }]),
					[{ text: this.config.backButton }],
					[{ text: this.config.nextButton }],
					[{ text: this.config.exitButton }],
				];
			}
		}

		return await telegramContext.send(this.config.selectActionMessage, {
			reply_markup: {
				resize_keyboard: true,
				remove_keyboard: true,
				keyboard: mainKeyboard,
			},
		});
	}
}

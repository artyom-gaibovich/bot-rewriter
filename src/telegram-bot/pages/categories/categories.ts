import { DIConstants } from '../../../constants/DI.constants';
import { AddStep, Ctx, Scene } from 'nestjs-puregram';
import { Inject } from '@nestjs/common';
import { CategoriesConfig } from './categories.config';
import { TelegramContextModel } from '../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';

export interface CategoriesInterface extends Record<string, any> {
	data: string;
}

export type CategoriesContext = TelegramContextModel & StepContext<CategoriesInterface>;

@Scene(DIConstants.Categories)
export class Categories {
	constructor(@Inject(DIConstants.CategoriesConfig) private config: CategoriesConfig) {}

	@AddStep(0)
	async firstStep(@Ctx() telegramContext: CategoriesContext) {
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
			return await telegramContext.scene.enter(DIConstants.Category, {
				state: {
					category: telegramContext.scene.state.categories.find(
						(cat) => cat.title === telegramContext.text,
					),
				},
			});
		}
		if (!telegramContext.scene.step.firstTime) {
			return await this.showCategories(telegramContext);
		}
	}

	private async showCategories(telegramContext: CategoriesContext) {
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

import { TelegramContextModel } from '../../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene } from 'nestjs-puregram';
import { DIConstants } from '../../../../constants/DI.constants';
import { Inject } from '@nestjs/common';
import { AddCategoryConfig } from './add-category.config';
import { CategoryManagerInterface } from '../../../../manager/category/category.manager.interface';

export interface AddUserChannelSceneInterface extends Record<string, any> {
	value: string;
	prompt: string;
	title: string;
}

export type AddUserChannelSceneContext = TelegramContextModel &
	StepContext<AddUserChannelSceneInterface>;

@Scene(DIConstants.AddCategory)
export class AddCategory {
	constructor(
		@Inject(DIConstants.AddCategoryConfig) private config: AddCategoryConfig,
		@Inject(DIConstants.CategoryManager) private categoryManager: CategoryManagerInterface,
	) {}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: AddUserChannelSceneContext): Promise<unknown> {
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
		}
		telegramContext.scene.state.title = telegramContext.text;
		await telegramContext.scene.step.next();
	}

	@AddStep(1)
	async firstStep(@Ctx() telegramContext: AddUserChannelSceneContext): Promise<unknown> {
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(this.config.promptMessage, {
				reply_markup: {
					remove_keyboard: true,
					resize_keyboard: true,
					keyboard: [[{ text: this.config.backButton }]],
				},
			});
		}
		if (telegramContext.text === this.config.backButton) {
			return await telegramContext.scene.enter(DIConstants.Categories);
		}
		telegramContext.scene.state.prompt = telegramContext.text;
		await telegramContext.scene.step.next();
	}

	@AddStep(2)
	async secondStep(@Ctx() telegramContext: AddUserChannelSceneContext): Promise<unknown> {
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(this.config.valueMessage, {
				reply_markup: {
					remove_keyboard: true,
					resize_keyboard: true,
					keyboard: [[{ text: this.config.backButton }]],
				},
			});
		}
		if (telegramContext.text === this.config.backButton) {
			return await telegramContext.scene.enter(DIConstants.Categories);
		}
		telegramContext.scene.state.value = telegramContext.text;
		await telegramContext.scene.step.next();
	}

	@AddStep(3)
	async thirdStep(@Ctx() telegramContext: AddUserChannelSceneContext): Promise<unknown> {
		const value = telegramContext.scene.state.value;
		const title = telegramContext.scene.state.title;
		const prompt = telegramContext.scene.state.prompt;
		const result = await this.categoryManager.create({
			categories: {
				title: title,
				value: value,
				prompt: prompt,
			},
		});
		if (result) {
			await telegramContext.send(`
			Категория: ${title}
			Промпт: ${prompt}
			[value]: ${value}
			
			были успешно добавлены.
			`);
			return await telegramContext.scene.enter(DIConstants.Categories);
		}
		await telegramContext.send(`
			Категория: ${title}
			Промпт: ${prompt}
			[value]: ${value}
			
			не были добавлены. скорее всего, технические неполадки.
			`);
		return await telegramContext.scene.enter(DIConstants.Categories);
	}
}

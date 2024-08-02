import { TelegramContextModel } from '../../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene } from 'nestjs-puregram';
import { DIConstants } from '../../../../constants/DI.constants';
import { Inject } from '@nestjs/common';
import { CategoryManagerInterface } from '../../../../manager/category/category.manager.interface';
import { EditCategoryConfig } from './edit-category.config';
import { CategoryInterface } from '../../../../client/storage/category/category.service.interface';

export interface EditUserChannelSceneInterface extends Record<string, any> {
	category: CategoryInterface;
	prompt: string;
	title: string;
	sequence: number;
}

export type EditUserChannelSceneContext = TelegramContextModel &
	StepContext<EditUserChannelSceneInterface>;

@Scene(DIConstants.EditCategory)
export class EditCategory {
	constructor(
		@Inject(DIConstants.EditCategoryConfig) private config: EditCategoryConfig,
		@Inject(DIConstants.CategoryManager) private categoryManager: CategoryManagerInterface,
	) {}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: EditUserChannelSceneContext): Promise<unknown> {
		if (telegramContext.scene.step.firstTime) {
			const value = telegramContext.scene.state.category.value;
			const sequence = telegramContext.scene.state.category.sequence;
			const title = telegramContext.scene.state.category.title;
			const prompt = telegramContext.scene.state.category.prompt;
			await telegramContext.send(`
			Категория: ${title}
			Промпт: ${prompt}
			Sequence: ${sequence}
			[value]: ${value}
			`);

			return await telegramContext.send(this.config.startMessage, {
				reply_markup: {
					remove_keyboard: true,
					resize_keyboard: true,
					keyboard: [[{ text: this.config.backButton }]],
				},
			});
		}
		if (telegramContext.text === this.config.backButton) {
			return await telegramContext.scene.enter(DIConstants.Category);
		}
		telegramContext.scene.state.title = telegramContext.text;
		await telegramContext.scene.step.next();
	}

	@AddStep(1)
	async firstStep(@Ctx() telegramContext: EditUserChannelSceneContext): Promise<unknown> {
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
			return await telegramContext.scene.enter(DIConstants.Category);
		}
		telegramContext.scene.state.prompt = telegramContext.text;
		await telegramContext.scene.step.next();
	}

	@AddStep(2)
	async thirdStep(@Ctx() telegramContext: EditUserChannelSceneContext): Promise<unknown> {
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(this.config.sequenceMessage, {
				reply_markup: {
					remove_keyboard: true,
					resize_keyboard: true,
					keyboard: [[{ text: this.config.backButton }]],
				},
			});
		}
		if (telegramContext.text === this.config.backButton) {
			return await telegramContext.scene.enter(DIConstants.Category);
		}
		try {
			telegramContext.scene.state.sequence = Number(telegramContext.text);
			await telegramContext.scene.step.next();
		} catch (e) {
			await telegramContext.send(this.config.errorParseNumber);
			return await telegramContext.scene.enter(DIConstants.Category);
		}
	}

	@AddStep(3)
	async fourthStep(@Ctx() telegramContext: EditUserChannelSceneContext): Promise<unknown> {
		const value = telegramContext.scene.state.category.value;
		const title = telegramContext.scene.state.title;
		const prompt = telegramContext.scene.state.prompt;
		const sequence = telegramContext.scene.state.sequence;
		const result = await this.categoryManager.update({
			categories: {
				sequence: sequence,
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
			
			были успешно обновлены.
			`);
			return await telegramContext.scene.enter(DIConstants.Categories);
		}
		await telegramContext.send(`
			Категория: ${title}
			Промпт: ${prompt}
			[value]: ${value}
			не были обновлены. скорее всего, технические неполадки.
			`);
		return await telegramContext.scene.enter(DIConstants.Category);
	}
}

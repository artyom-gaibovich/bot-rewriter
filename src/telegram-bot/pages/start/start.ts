import { TelegramContextModel } from '../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { Inject } from '@nestjs/common';
import { StartConfig } from './start.config';
import { DIConstants } from '../../../constants/DI.constants';

export interface StartInterface extends Record<string, any> {
	activateCode: string;
}

export type StartContext = TelegramContextModel & StepContext<StartInterface>;

@Scene(DIConstants.Start)
export class Start {
	constructor(
		@Inject(DIConstants.StartConfig) private config: StartConfig, // Внедряем конфиг
	) {}

	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: StartContext) {
		telegramContext.scene.state.activateCode = this.config.activateCode;
	}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: StartContext) {
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(this.config.initialMessage, {
				reply_markup: {
					resize_keyboard: true,
					remove_keyboard: true,
					keyboard: [
						[{ text: this.config.proceedButton }],
						[{ text: this.config.improveLimitsButton }],
					],
				},
			});
		}
		if (telegramContext.text === this.config.proceedButton) {
			return await telegramContext.scene.enter(DIConstants.MainChannel);
		}
		if (telegramContext.text === this.config.improveLimitsButton) {
			return await telegramContext.scene.enter(DIConstants.ImproveLimits);
		} else {
			return await telegramContext.send(this.config.backButton, {
				reply_markup: {
					resize_keyboard: true,
					remove_keyboard: true,
					keyboard: [
						[{ text: this.config.proceedButton }],
						[{ text: this.config.improveLimitsButton }],
					],
				},
			});
		}
	}
}

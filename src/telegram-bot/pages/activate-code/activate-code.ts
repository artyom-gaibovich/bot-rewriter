import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { TelegramContextModel } from '../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { Inject } from '@nestjs/common';
import {
	ACTIVATE_CODE,
	ADD_CHANNELS_PROMO,
	MAIN_CHANNEL_PAGE,
	START,
	SUPPORT,
} from '../pages.types';
import { ActivateCodeConfig } from './activate-code.config';
import { DIConstants } from '../../../constants/DI.constants';

export interface ActivateCodeInterface extends Record<string, any> {
	activateCode: string;
	isClicked: boolean;
}

export type ActivateCodeScene = TelegramContextModel & StepContext<ActivateCodeInterface>;

@Scene(DIConstants.ActivateCode)
export class ActivateCode {
	constructor(@Inject(DIConstants.ActivateCodeConfig) private config: ActivateCodeConfig) {}

	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: ActivateCodeScene) {
		telegramContext.scene.state.activateCode = 'admin'; // Лучше хранить в конфиге, если это переменное значение
	}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: ActivateCodeScene) {
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(this.config.welcomeMessage, {
				reply_markup: {
					remove_keyboard: true,
				},
			});
		}
		if (telegramContext.scene.state.activateCode === telegramContext.text) {
			return await telegramContext.scene.enter(DIConstants.AddChannelPromo);
		}
		if (telegramContext.text === this.config.supportButton) {
			return await telegramContext.scene.enter(DIConstants.Support, {
				state: {
					supportFlag: 'activateCode',
				},
			});
		} else {
			return await telegramContext.send(this.config.invalidCodeMessage, {
				reply_markup: {
					resize_keyboard: true,
					remove_keyboard: true,
					keyboard: [[{ text: this.config.supportButton }]],
				},
			});
		}
	}
}

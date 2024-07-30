import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { TelegramContextModel } from '../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { MAIN_CHANNEL_PAGE, MAIN_CHANNELS_TO_REWRITE_PAGE } from '../pages.types';
import { UserChannelInterface } from '../../../client/storage/storage.model';
import { ImproveLimitsConfig } from './improve-limits.config'; // Импортируем конфиг
import { Inject } from '@nestjs/common';
import { DIConstants } from '../../../constants/DI.constants';

export interface ImproveLimitsInterface extends Record<string, any> {
	flag: 'MAIN_CHANNELS_TO_REWRITE_PAGE' | 'MAIN_CHANNEL';
	foundUserChannel: UserChannelInterface;
}

export type ImproveLimitsContext = TelegramContextModel & StepContext<ImproveLimitsInterface>;

@Scene(DIConstants.ImproveLimits) // Обновляем декоратор
export class ImproveLimits {
	constructor(
		@Inject(DIConstants.ImproveLimitsConfig) private config: ImproveLimitsConfig, // Внедряем конфиг
	) {}

	/*	@SceneEnter()
		async sceneEnter(@Ctx() telegramContext: ImproveLimitsContext) {}*/

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: ImproveLimitsContext) {
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(
				`${this.config.currentPlanMessage} ${this.config.subscribeLink}`,
				{
					reply_markup: {
						resize_keyboard: true,
						remove_keyboard: true,
						keyboard: [[{ text: this.config.backButton }]],
					},
				},
			);
		}
		if (telegramContext.text === this.config.backButton) {
			const flag = telegramContext.scene.state.flag;
			if (flag === MAIN_CHANNELS_TO_REWRITE_PAGE) {
				return await telegramContext.scene.enter(MAIN_CHANNELS_TO_REWRITE_PAGE, {
					state: {
						foundUserChannel: telegramContext.scene.state.foundUserChannel,
					},
				});
			}
			return await telegramContext.scene.enter(MAIN_CHANNEL_PAGE);
		} else {
			return await telegramContext.send(
				`${this.config.currentPlanMessage} ${this.config.subscribeLink}`,
				{
					reply_markup: {
						resize_keyboard: true,
						remove_keyboard: true,
						keyboard: [[{ text: this.config.returnBackButton }]],
					},
				},
			);
		}
	}
}

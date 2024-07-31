import { TelegramContextModel } from '../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { AddChannelsPromoConfig } from './add-channels-promo.config';
import { Inject } from '@nestjs/common';
import { DIConstants } from '../../../constants/DI.constants';

export interface AddChannelsPromoInterface extends Record<string, any> {
	data: number;
}

export type AddChannelsPromoContext = TelegramContextModel & StepContext<AddChannelsPromoInterface>;

@Scene(DIConstants.AddChannelPromo) // Используем DIConstant
export class AddChannelsPromo {
	constructor(
		@Inject(DIConstants.AddChannelPromoConfig) private config: AddChannelsPromoConfig, // Внедряем конфиг
	) {}

	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: AddChannelsPromoContext) {}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: AddChannelsPromoContext) {
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(this.config.welcomeMessage, {
				reply_markup: {
					resize_keyboard: true,
					remove_keyboard: true,
					keyboard: [[{ text: this.config.startButton }, { text: this.config.supportButton }]],
				},
			});
		}

		switch (telegramContext.text) {
			case this.config.startButton:
				return await telegramContext.scene.enter(DIConstants.MainChannel, {
					state: {
						countToJoinMainPage: 1,
					},
				});

			case this.config.supportButton:
				return await telegramContext.scene.enter(DIConstants.Support, {
					state: {
						supportFlag: DIConstants.AddChannelPromo,
					},
				});

			case this.config.backButton:
				return await telegramContext.scene.enter(DIConstants.Start);

			default:
				return;
		}
	}
}

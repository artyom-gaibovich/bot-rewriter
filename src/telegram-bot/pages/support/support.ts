import { AddStep, Ctx, Scene } from 'nestjs-puregram';
import { TelegramContextModel } from '../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { Inject } from '@nestjs/common';
import { SupportConfig } from './support.config';
import { DIConstants } from '../../../constants/DI.constants'; // Импортируем конфиг

export interface SupportInterface extends Record<string, any> {
	supportFlag: DIConstants.ActivateCode | DIConstants.MainChannel | DIConstants.AddChannelPromo;
}

export type SupportContext = TelegramContextModel & StepContext<SupportInterface>;

@Scene(DIConstants.Support)
export class Support {
	constructor(
		@Inject(DIConstants.SupportConfig) private config: SupportConfig, // Внедряем конфиг
	) {}

	/*@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: SupportContext) {}*/

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: SupportContext) {
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(this.config.initialMessage, {
				reply_markup: {
					resize_keyboard: true,
					remove_keyboard: true,
					keyboard: [[{ text: this.config.backButton }]],
				},
			});
		}

		if (telegramContext.text === this.config.backButton) {
			const supportFlag = telegramContext.scene.state.supportFlag;
			let pageToRedirect: string;
			if (supportFlag === DIConstants.ActivateCode) {
				pageToRedirect = DIConstants.ActivateCode;
			} else if (supportFlag === DIConstants.MainChannel) {
				pageToRedirect = DIConstants.MainChannel;
			} else if (supportFlag === DIConstants.AddChannelPromo) {
				pageToRedirect = DIConstants.AddChannelPromo;
			} else {
				return await telegramContext.send(this.config.unknownFlag, {
					reply_markup: {
						resize_keyboard: true,
						keyboard: [[{ text: this.config.backButton }]],
					},
				});
			}

			return await telegramContext.scene.enter(pageToRedirect);
		}
	}
}

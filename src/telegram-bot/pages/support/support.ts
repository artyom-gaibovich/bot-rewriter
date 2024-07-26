import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { TelegramContextModel } from '../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { ACTIVATE_CODE, ADD_CHANNELS_PROMO, MAIN_CHANNEL_PAGE, SUPPORT } from '../pages.types';

export interface SupportInterface extends Record<string, any> {
	supportFlag: 'addChannelsPromo' | 'mainChannel' | 'activateCode';
}

export type SupportContext = TelegramContextModel & StepContext<SupportInterface>;

@Scene(SUPPORT)
export class Support {
	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: SupportContext) {}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: SupportContext) {
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send('Что-то пошло не так? Мы на связи 24/7😎 @example', {
				reply_markup: {
					resize_keyboard: true,
					remove_keyboard: true,
					keyboard: [[{ text: 'Вернуться обратно' }]],
				},
			});
		}
		if (telegramContext.text === 'Вернуться обратно') {
			const supportFlag = telegramContext.scene.state.supportFlag;
			let pageToRedirect: string;
			if (supportFlag === 'activateCode') {
				pageToRedirect = ACTIVATE_CODE;
			}
			if (supportFlag === 'mainChannel') {
				pageToRedirect = MAIN_CHANNEL_PAGE;
			}
			if (supportFlag === 'addChannelsPromo') {
				pageToRedirect = ADD_CHANNELS_PROMO;
			}
			return await telegramContext.scene.enter(pageToRedirect);
		}
	}
}

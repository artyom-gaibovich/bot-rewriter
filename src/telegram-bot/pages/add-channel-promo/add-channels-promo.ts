import { TelegramContextModel } from '../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { ADD_CHANNELS_PROMO, MAIN_CHANNEL_PAGE, START, SUPPORT } from '../pages.types';
import { AddChannelsPromoConfig } from './add-channels-promo.config';
import { StartContext } from '../start/start';
import { Inject } from '@nestjs/common';
import { ADD_CHANNELS_PROMO_CONFIG } from '../../../constants/DI.constants';

export interface AddChannelsPromoInterface extends Record<string, any> {}

export type AddChannelsPromoContext = TelegramContextModel & StepContext<AddChannelsPromoInterface>;

@Scene(ADD_CHANNELS_PROMO)
export class AddChannelsPromo {
	constructor(@Inject(ADD_CHANNELS_PROMO_CONFIG) private config: AddChannelsPromoConfig) {}

	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: AddChannelsPromoContext) {}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: StartContext) {
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(
				`😎 Код введён верно! Приступим к генерации контента? 

Добавьте свои основные каналы для которых будет генерироваться контент и дополнительные каналы с которых будет парситься материал для генерации. 

Если вы запутались и не понимаете что делать — напишите в поддержку или посмотрите наш видео-туториал.`,
				{
					reply_markup: {
						resize_keyboard: true,
						remove_keyboard: true,
						keyboard: [[{ text: 'Начинаем!' }, { text: 'Техподдержка' }]],
					},
				},
			);
		}
		if (telegramContext.text === 'Начинаем!') {
			return await telegramContext.scene.enter(MAIN_CHANNEL_PAGE, {
				state: {
					countToJoinMainPage: 1,
				},
			});
		}
		if (telegramContext.text === 'Техподдержка') {
			return await telegramContext.scene.enter(SUPPORT, {
				state: {
					supportFlag: 'addChannelsPromo',
				},
			});
		}
		if (telegramContext.text === 'Вернуться назад') {
			return await telegramContext.scene.enter(START);
		}
	}
}

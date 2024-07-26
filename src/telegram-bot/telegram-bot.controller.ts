import { Ctx, Hears, Update } from 'nestjs-puregram';
import { KeyboardInterface } from './keyboard/keyboard.interface';
import { Inject, Injectable } from '@nestjs/common';
import { TelegramContextModel } from './model/telegram-context-model';
import {
	ACTIVATE_CODE,
	ADD_CHANNEL_CATEGORY,
	ADD_USER_CHANNEL_PAGE,
	MAIN_CHANNEL_PAGE,
} from './pages/pages.types';
import { ActivateCodeModule } from './pages/activate-code/activate-code.module';

@Update()
@Injectable()
export class TelegramBotController {
	constructor(@Inject('MAIN_KEYBOARD') private keyboard: KeyboardInterface) {}

	@Hears('/start')
	//БАГ С ДОБАВЛЕНИЕМ КАНАЛОВ ЕСТЬ
	async start(@Ctx() telegramContext: TelegramContextModel) {
		await telegramContext.scene.enter(ACTIVATE_CODE);
	}
}

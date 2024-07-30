import { Ctx, Hears, Update } from 'nestjs-puregram';
import { KeyboardInterface } from './keyboard/keyboard.interface';
import { Inject, Injectable } from '@nestjs/common';
import { TelegramContextModel } from './model/telegram-context-model';
import { ACTIVATE_CODE } from './pages/pages.types';
import { DIConstants } from '../constants/DI.constants';

@Update()
@Injectable()
export class TelegramBotController {
	@Hears('/start')
	async start(@Ctx() telegramContext: TelegramContextModel) {
		await telegramContext.scene.enter(DIConstants.ActivateCode);
	}
}

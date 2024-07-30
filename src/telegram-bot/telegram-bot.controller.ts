import { Ctx, Hears, Update } from 'nestjs-puregram';
import { Injectable } from '@nestjs/common';
import { TelegramContextModel } from './model/telegram-context-model';
import { DIConstants } from '../constants/DI.constants';

@Update()
@Injectable()
export class TelegramBotController {
	@Hears('/start')
	async start(@Ctx() telegramContext: TelegramContextModel): Promise<void> {
		await telegramContext.scene.enter(DIConstants.ActivateCode);
	}
}

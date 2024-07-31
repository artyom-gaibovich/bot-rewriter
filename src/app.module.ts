import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramModule } from 'nestjs-puregram';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';

@Module({
	imports: [
		TelegramBotModule,
		TelegramModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				token: configService.get('BOT_TOKEN'),
			}),
		}),
		ConfigModule.forRoot({ isGlobal: true }),
	],
	providers: [],
	controllers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageModule } from './client/storage/storage.module';
import { CustomLoggerModule } from './logger/custom-logger.module';

@Module({
	imports: [
		/*		TelegramBotModule,
		TelegramModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				token: configService.get('BOT_TOKEN'),
			}),
		}),*/
		StorageModule.forRoot(),
		ConfigModule.forRoot({ isGlobal: true }),
	],
	providers: [],
	controllers: [],
})
export class AppModule {}

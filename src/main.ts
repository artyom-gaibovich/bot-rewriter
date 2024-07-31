import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './logger/custom-logger.service';
import { ErrorInterceptor } from './interceptors/telegram-bot.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new CustomLoggerService(),
	});
	app.setGlobalPrefix('api');
	app.useGlobalInterceptors(new ErrorInterceptor());
	await app.listen(3000);
}

bootstrap();

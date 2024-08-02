import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './logger/custom-logger.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new CustomLoggerService(),
	});
	app.setGlobalPrefix('api');
	await app.listen(3000);
}

bootstrap();

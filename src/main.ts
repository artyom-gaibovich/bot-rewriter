import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new ConfigService();
	await app.listen(parseInt(config.get('APP_PORT')));
}

bootstrap();

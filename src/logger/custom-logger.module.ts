import { CustomLoggerService } from './custom-logger.service';
import { Module } from '@nestjs/common';

@Module({
	providers: [CustomLoggerService],
	exports: [CustomLoggerService],
})
export class CustomLoggerModule {}

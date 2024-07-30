import { CustomLoggerService } from './custom-logger.service';
import { Global, Module } from '@nestjs/common';
import { DIConstants } from '../constants/DI.constants';

@Module({
	providers: [CustomLoggerService],
	exports: [CustomLoggerService],
})
export class CustomLoggerModule {}

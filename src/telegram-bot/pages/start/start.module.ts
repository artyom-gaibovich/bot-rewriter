import { Module } from '@nestjs/common';
import { startConfig } from './start.config';
import { DIConstants } from '../../../constants/DI.constants';
import { Start } from './start';

@Module({
	providers: [
		{
			provide: DIConstants.StartConfig,
			useValue: startConfig(),
		},
		{
			provide: DIConstants.Start,
			useClass: Start,
		},
	],
})
export class StartModule {}

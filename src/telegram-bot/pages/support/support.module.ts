import { Module } from '@nestjs/common';
import { Support } from './support';
import { supportConfig } from './support.config';
import { DIConstants } from '../../../constants/DI.constants';

@Module({
	providers: [
		{
			provide: DIConstants.SupportConfig,
			useValue: supportConfig(),
		},
		{
			provide: DIConstants.Support,
			useClass: Support,
		},
	],
})
export class SupportModule {}

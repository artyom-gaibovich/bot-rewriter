import { Module } from '@nestjs/common';
import { improveLimitsConfig } from './improve-limits.config';
import { DIConstants } from '../../../constants/DI.constants';
import { ImproveLimits } from './improve-limits';

@Module({
	providers: [
		{
			provide: DIConstants.ImproveLimitsConfig,
			useValue: improveLimitsConfig(),
		},
		{
			provide: DIConstants.ImproveLimits,
			useClass: ImproveLimits,
		},
	],
})
export class ImproveLimitsModule {}

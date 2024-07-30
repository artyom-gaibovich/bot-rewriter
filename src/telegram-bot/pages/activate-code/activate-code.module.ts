import { Module } from '@nestjs/common';
import { activateCodeConfig } from './activate-code.config';
import { DIConstants } from '../../../constants/DI.constants';
import { ActivateCode } from './activate-code';

@Module({
	providers: [
		{
			provide: DIConstants.ActivateCodeConfig,
			useValue: activateCodeConfig(),
		},
		{
			provide: DIConstants.ActivateCode,
			useClass: ActivateCode,
		},
	],
})
export class ActivateCodeModule {}

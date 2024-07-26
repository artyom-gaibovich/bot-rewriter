import { Module } from '@nestjs/common';
import { LinkValidator } from './link.validator';
import { LINK_VALIDATOR } from '../constants/DI.constants';

@Module({
	providers: [
		{
			provide: LINK_VALIDATOR,
			useFactory: () => {
				return new LinkValidator();
			},
		},
	],
	exports: [LINK_VALIDATOR],
})
export class LinkValidatorModule {}

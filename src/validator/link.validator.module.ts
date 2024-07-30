import { Module } from '@nestjs/common';
import { LinkValidator } from './link.validator';
import { DIConstants } from '../constants/DI.constants';

@Module({
	providers: [
		{
			provide: DIConstants.LinkValidator,
			useFactory: () => {
				return new LinkValidator();
			},
		},
	],
	exports: [DIConstants.LinkValidator],
})
export class LinkValidatorModule {}

import { Module } from '@nestjs/common';
import { DIConstants } from '../../constants/DI.constants';
import { ContentAgencyClient } from './content-agency.client';

@Module({
	providers: [
		{
			provide: DIConstants.ContentAgencyClient,
			useClass: ContentAgencyClient,
		},
	],
	exports: [DIConstants.ContentAgencyClient],
})
export class ContentAgencyClientModule {}

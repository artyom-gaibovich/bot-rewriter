import { Module } from '@nestjs/common';
import { CONTENT_AGENCY_CLIENT, STORAGE_CLIENT } from '../../constants/DI.constants';
import { ContentAgencyClient } from '../content-agency/content-agency.client';
import { StorageClient } from './storage.client';

@Module({
	providers: [
		{
			provide: STORAGE_CLIENT,
			useFactory: () => {
				return new StorageClient();
			},
		},
	],
	exports: [STORAGE_CLIENT],
})
export class StorageClientModule {}

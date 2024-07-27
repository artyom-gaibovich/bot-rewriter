import { Module } from '@nestjs/common';
import { STORAGE_CLIENT } from '../../constants/DI.constants';
import { StorageClientOld } from './storage.client.old';

@Module({
	providers: [
		{
			provide: STORAGE_CLIENT,
			useFactory: () => {
				return new StorageClientOld();
			},
		},
	],
	exports: [STORAGE_CLIENT],
})
export class StorageClientModuleOld {}

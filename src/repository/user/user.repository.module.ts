import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { LinkInterface } from '../../model/link/link.interface';
import { StorageClientInterface } from '../../client/storage/storage.client.interface';
import { StorageClientModule } from '../../client/storage/storage.client.module';
import { STORAGE_CLIENT, USER_REPOSITORY } from '../../constants/DI.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepositoryLinkConfig } from './user.repository.link.config';
import { GET_USER_URL, USER_REPOSITORY_LINK_CONFIG } from '../../constants/enviroment.constants';

@Module({
	imports: [StorageClientModule, ConfigModule],
	providers: [
		{
			provide: USER_REPOSITORY_LINK_CONFIG,
			useFactory: (config: ConfigService) => {
				return {
					get: { link: config.get(GET_USER_URL) },
				} as UserRepositoryLinkConfig;
			},
			inject: [ConfigService],
		},
		{
			provide: USER_REPOSITORY,
			useFactory: (config: UserRepositoryLinkConfig, client: StorageClientInterface) => {
				return new UserRepository(config, client);
			},
			inject: [USER_REPOSITORY_LINK_CONFIG, STORAGE_CLIENT],
		},
	],
	exports: [USER_REPOSITORY],
})
export class UserRepositoryModule {}

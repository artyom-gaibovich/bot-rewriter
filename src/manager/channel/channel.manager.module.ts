import { Module } from '@nestjs/common';
import { UserManagerLinkConfig } from '../user/user.manager.link.config';
import { StorageClientInterfaceOld } from '../../client/storage/storage.client.interface.old';
import { UserManager } from '../user/user.manager';
import { ChannelManagerLinkConfig } from './channel.manager.link.config';
import { ChannelManager } from './channel.manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
	CHANNEL_MANAGER,
	CHANNEL_MANAGER_LINK_CONFIG,
	STORAGE_CLIENT,
} from '../../constants/DI.constants';
import { StorageClientOld } from '../../client/storage/storage.client.old';
import {
	ADD_CHANNEL_URL,
	DELETE_CHANNEL_TO_REWRITE_URL,
	DELETE_CHANNEL_URL,
} from '../../constants/enviroment.constants';
import { StorageClientModuleOld } from '../../client/storage/storage.client.module.old';

@Module({
	imports: [StorageClientModuleOld, ConfigModule],
	providers: [
		{
			provide: CHANNEL_MANAGER_LINK_CONFIG,
			useFactory: (config: ConfigService) => {
				return {
					addChannel: { link: config.get(ADD_CHANNEL_URL) },
					deleteChannel: { link: config.get(DELETE_CHANNEL_URL) },
					deleteChannelToRewrite: { link: config.get(DELETE_CHANNEL_TO_REWRITE_URL) },
				} as ChannelManagerLinkConfig;
			},
			inject: [ConfigService],
		},

		{
			provide: CHANNEL_MANAGER,
			useFactory: (
				linkConfig: ChannelManagerLinkConfig,
				channelService: StorageClientInterfaceOld,
			) => {
				return new ChannelManager(linkConfig, channelService);
			},
			inject: [CHANNEL_MANAGER_LINK_CONFIG, STORAGE_CLIENT],
		},
	],
	exports: [CHANNEL_MANAGER],
})
export class ChannelManagerModule {}

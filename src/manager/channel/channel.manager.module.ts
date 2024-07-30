import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DIConstants } from '../../constants/DI.constants';
import { ChannelManager } from './channel.manager';
import { ChannelServiceModule } from '../../client/storage/channel/channel.service.module';

@Module({
	imports: [ChannelServiceModule, ConfigModule],
	providers: [
		{
			provide: DIConstants.ChannelManager,
			useClass: ChannelManager,
		},
	],
	exports: [DIConstants.ChannelManager],
})
export class ChannelManagerModule {}

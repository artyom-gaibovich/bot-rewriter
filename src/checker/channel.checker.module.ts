import { Module } from '@nestjs/common';
import { DIConstants } from '../constants/DI.constants';
import { ChannelServiceModule } from '../client/storage/channel/channel.service.module';
import { ChannelChecker } from './channel.checker';

@Module({
	imports: [ChannelServiceModule],
	providers: [
		{
			provide: DIConstants.ChannelChecker,
			useClass: ChannelChecker,
		},
	],
	exports: [DIConstants.ChannelChecker],
})
export class ChannelCheckerModule {}

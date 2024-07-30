import { Module } from '@nestjs/common';
import { ChannelManagerModule } from '../../../manager/channel/channel.manager.module';
import { ChannelCheckerModule } from '../../../checker/channel.checker.module';
import { MainChannelToRewrite } from './main-channel-to-rewrite';
import { DIConstants } from '../../../constants/DI.constants';
import { mainChannelToRewriteConfig } from './main-channel-to-rewrite.config';

@Module({
	imports: [ChannelManagerModule, ChannelCheckerModule],
	providers: [
		{
			provide: DIConstants.MainChannelToRewriteConfig,
			useValue: mainChannelToRewriteConfig(),
		},
		{
			provide: DIConstants.MainChannelToRewrite,
			useClass: MainChannelToRewrite,
		},
	],
})
export class MainChannelRewriteModule {}

import { Module } from '@nestjs/common';
import { ChannelCheckerModule } from '../../../../checker/channel.checker.module';
import { ChannelManagerModule } from '../../../../manager/channel/channel.manager.module';
import { AddChannelToRewrite } from './add-channel-to-rewrite';
import { addChannelToRewriteConfig } from './add-channel-to-rewrite.config';
import { DIConstants } from '../../../../constants/DI.constants';

@Module({
	imports: [ChannelCheckerModule, ChannelManagerModule],
	providers: [
		{
			provide: DIConstants.AddChannelToRewriteConfig,
			useValue: addChannelToRewriteConfig(),
		},
		{
			provide: DIConstants.AddChannelToRewrite,
			useClass: AddChannelToRewrite,
		},
	],
})
export class AddChannelToRewriteModule {}

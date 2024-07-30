import { Module } from '@nestjs/common';
import { ContentRewriterModule } from '../../../rewriter/content.rewriter.module';
import { MainChannelsToRewrite } from './main-channels-to-rewrite';
import { UserRepositoryModule } from '../../../repository/user/user.repository.module';
import { DIConstants } from '../../../constants/DI.constants';
import { mainChannelsToRewriteConfig } from './main-channels-to-rewrite.config';

@Module({
	imports: [ContentRewriterModule, UserRepositoryModule],
	providers: [
		{
			provide: DIConstants.MainChannelsToRewriteConfig,
			useValue: mainChannelsToRewriteConfig(),
		},
		{
			provide: DIConstants.MainChannelsToRewrite,
			useClass: MainChannelsToRewrite,
		},
	],
})
export class MainChannelsToRewriteModule {}

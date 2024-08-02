import { Module } from '@nestjs/common';
import { TextRewriterModule } from '../../../rewriter/text.rewriter.module';
import { MainChannelsToRewrite } from './main-channels-to-rewrite';
import { UserRepositoryModule } from '../../../repository/user/user.repository.module';
import { DIConstants } from '../../../constants/DI.constants';
import { mainChannelsToRewriteConfig } from './main-channels-to-rewrite.config';
import { CategoryRepositoryModule } from '../../../repository/category/category.repository.module';

@Module({
	imports: [TextRewriterModule, UserRepositoryModule, CategoryRepositoryModule],
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

import { Module } from '@nestjs/common';
import { TelegramBotController } from './telegram-bot.controller';
import { DeleteUserChannelModule } from './pages/main-channel/delete-user-channel/delete-user-channel.module';
import { AddChannelToRewriteModule } from './pages/main-channel-to-rewrite/add/add-channel-to-rewrite.module';
import { AddUserChannelModule } from './pages/main-channel/add-user-channel/add-user-channel.module';
import { MainChannelRewriteModule } from './pages/main-channel-to-rewrite/main-channel-rewrite.module';
import { MainChannelModule } from './pages/main-channel/main-channel.module';
import { MainChannelsToRewriteModule } from './pages/main-channels-to-rewrite/main-channels-to-rewrite.module';
import { ActivateCodeModule } from './pages/activate-code/activate-code.module';
import { AddChannelsPromoModule } from './pages/add-channel-promo/add-channels-promo.module';
import { ImproveLimitsModule } from './pages/improve-limits/improve-limits.module';
import { SupportModule } from './pages/support/support.module';
import { AddChannelCategoryModule } from './pages/main-channel/add-user-channel/add-channel-category/add-channel-category.module';
import { CategoryModule } from './pages/categories/category/category.module';
import { CategoriesModule } from './pages/categories/categories.module';
import { AddCategoryModule } from './pages/categories/add-category/add-category.module';
import { EditCategoryModule } from './pages/categories/edit-category/edit-category.module';

@Module({
	imports: [
		CategoriesModule,
		CategoryModule,
		EditCategoryModule,
		AddCategoryModule,
		AddChannelCategoryModule,
		AddChannelsPromoModule,
		SupportModule,
		ImproveLimitsModule,
		ActivateCodeModule,
		DeleteUserChannelModule,
		AddChannelToRewriteModule,
		AddUserChannelModule,
		MainChannelRewriteModule,
		MainChannelModule,
		MainChannelsToRewriteModule,
	],
	providers: [TelegramBotController],
})
export class TelegramBotModule {}

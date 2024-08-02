import { Module } from '@nestjs/common';
import { ChannelManagerModule } from '../../../../manager/channel/channel.manager.module';
import { DIConstants } from '../../../../constants/DI.constants';
import { categoryConfig } from './category.config';
import { Category } from './category';
import { CategoryManagerModule } from '../../../../manager/category/category.manager.module';

@Module({
	imports: [CategoryManagerModule],
	providers: [
		{
			provide: DIConstants.CategoryConfig,
			useValue: categoryConfig(),
		},
		{
			provide: DIConstants.Category,
			useClass: Category,
		},
	],
})
export class CategoryModule {}

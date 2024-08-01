import { Module } from '@nestjs/common';
import { ChannelManagerModule } from '../../../../manager/channel/channel.manager.module';
import { DIConstants } from '../../../../constants/DI.constants';
import { categoryConfig } from './category.config';
import { Category } from './category';

@Module({
	imports: [ChannelManagerModule],
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

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DIConstants } from '../../constants/DI.constants';
import { CategoryServiceModule } from '../../client/storage/category/category.service.module';
import { CategoryManager } from './category.manager';

@Module({
	imports: [CategoryServiceModule, ConfigModule],
	providers: [
		{
			provide: DIConstants.CategoryManager,
			useClass: CategoryManager,
		},
	],
	exports: [DIConstants.CategoryManager],
})
export class ChannelManagerModule {}

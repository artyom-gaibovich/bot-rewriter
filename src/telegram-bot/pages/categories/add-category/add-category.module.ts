import { Module } from '@nestjs/common';
import { DIConstants } from '../../../../constants/DI.constants';
import { categoriesConfig } from '../categories.config';
import { addCategoryConfig } from './add-category.config';
import { CategoryModule } from '../category/category.module';
import { AddCategory } from './add-category';
import { CategoryManagerModule } from '../../../../manager/category/category.manager.module';

@Module({
	imports: [CategoryManagerModule],
	providers: [
		{
			provide: DIConstants.AddCategoryConfig,
			useValue: addCategoryConfig(),
		},
		{
			provide: DIConstants.AddCategory,
			useClass: AddCategory,
		},
	],
})
export class AddCategoryModule {}

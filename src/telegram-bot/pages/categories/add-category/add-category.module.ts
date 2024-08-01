import { Module } from '@nestjs/common';
import { DIConstants } from '../../../../constants/DI.constants';
import { categoriesConfig } from '../categories.config';
import { addCategoryConfig } from './add-category.config';

@Module({
	providers: [
		{
			provide: DIConstants.AddCategoryConfig,
			useValue: addCategoryConfig(),
		},
		{
			provide: DIConstants.AddCategory,
			useClass: CategoriesModule,
		},
	],
})
export class CategoriesModule {}

import { Module } from '@nestjs/common';
import { DIConstants } from '../../../constants/DI.constants';
import { categoriesConfig } from './categories.config';
import { CategoryRepositoryModule } from '../../../repository/category/category.repository.module';
import { Categories } from './categories';

@Module({
	imports: [CategoryRepositoryModule],
	providers: [
		{
			provide: DIConstants.CategoriesConfig,
			useValue: categoriesConfig(),
		},
		{
			provide: DIConstants.Categories,
			useClass: Categories,
		},
	],
})
export class CategoriesModule {}

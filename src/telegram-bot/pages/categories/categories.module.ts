import { Module } from '@nestjs/common';
import { DIConstants } from '../../../constants/DI.constants';
import { categoriesConfig } from './categories.config';

@Module({
	providers: [
		{
			provide: DIConstants.CategoriesConfig,
			useValue: categoriesConfig(),
		},
		{
			provide: DIConstants.Categories,
			useClass: CategoriesModule,
		},
	],
})
export class CategoriesModule {}

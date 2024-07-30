import { Module } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { DIConstants } from '../../constants/DI.constants';
import { CategoryServiceModule } from '../../client/storage/category/category.service.module';

@Module({
	imports: [CategoryServiceModule],
	providers: [
		{
			provide: DIConstants.CategoryRepository,
			useClass: CategoryRepository,
		},
	],
	exports: [DIConstants.CategoryRepository],
})
export class CategoryRepositoryModule {}

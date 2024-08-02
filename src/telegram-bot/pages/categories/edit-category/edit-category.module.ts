import { Module } from '@nestjs/common';
import { DIConstants } from '../../../../constants/DI.constants';
import { Categories } from '../categories';
import { CategoryManagerModule } from '../../../../manager/category/category.manager.module';
import { editCategoryConfig } from './edit-category.config';
import { EditCategory } from './edit-category';

@Module({
	imports: [CategoryManagerModule],
	providers: [
		{
			provide: DIConstants.EditCategoryConfig,
			useValue: editCategoryConfig(),
		},
		{
			provide: DIConstants.EditCategory,
			useClass: EditCategory,
		},
	],
})
export class EditCategoryModule {}

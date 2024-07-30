import { Module } from '@nestjs/common';
import { addChannelCategoryConfig } from './add-channel-category.config';
import { CategoryRepositoryModule } from '../../../../../repository/category/category.repository.module';
import { DIConstants } from '../../../../../constants/DI.constants';
import { AddChannelCategory } from './add-channel-category';

@Module({
	imports: [CategoryRepositoryModule],
	providers: [
		{
			provide: DIConstants.AddChannelCategoryConfig,
			useValue: addChannelCategoryConfig(),
		},
		{
			provide: DIConstants.AddChannelCategory,
			useClass: AddChannelCategory,
		},
	],
})
export class AddChannelCategoryModule {}

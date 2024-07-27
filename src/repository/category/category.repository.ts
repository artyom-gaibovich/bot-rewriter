import { CategoryRepositoryInterface } from './category.repository.interface';
import { StorageClientInterfaceOld } from '../../client/storage/storage.client.interface.old';
import { CategoryRepositoryLinkConfig } from './category.repository.link.config';
import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY_LINK_CONFIG, STORAGE_CLIENT } from '../../constants/DI.constants';

@Injectable()
export class CategoryRepository implements CategoryRepositoryInterface {
	constructor(
		@Inject(CATEGORY_REPOSITORY_LINK_CONFIG) private config: CategoryRepositoryLinkConfig,
		@Inject(STORAGE_CLIENT) private client: StorageClientInterfaceOld,
	) {}

	async findAll(): Promise<CategoryInterface[]> {
		const data = (
			await this.client.getCategories({
				url: this.config.findAll,
			})
		).categories;
		console.log(data);

		return (
			await this.client.getCategories({
				url: this.config.findAll,
			})
		).categories;
	}
}

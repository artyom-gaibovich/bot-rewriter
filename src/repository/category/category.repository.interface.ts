import { CategoryInterface } from '../../client/storage/category/category.service.interface';

export interface CategoryRepositoryInterface {
	findAll(): Promise<{ categories: CategoryInterface[] }>;
}

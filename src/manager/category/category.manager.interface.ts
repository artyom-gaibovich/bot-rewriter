import { CategoryInterface } from '../../client/storage/category/category.service.interface';

export interface CategoryManagerInterface {
	create(req: { categories: CategoryInterface }): Promise<{ categories: CategoryInterface[] }>;

	delete(req: { categories: CategoryInterface }): Promise<{ categories: CategoryInterface[] }>;

	getAll(): Promise<{ categories: CategoryInterface[] }>;

	update(req: { categories: CategoryInterface }): Promise<{ categories: CategoryInterface[] }>;
}

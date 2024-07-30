import { CategoryInterface } from '../storage.model';

export interface CategoryServiceInterface {
	getAll(): Promise<{ categories: CategoryInterface[] }>;

	create(req: { categories: CategoryInterface[] }): Promise<{ categories: CategoryInterface[] }>;

	delete(req: { categories: CategoryInterface[] }): Promise<{ categories: CategoryInterface[] }>;

	update(req: { categories: CategoryInterface[] }): Promise<{ categories: CategoryInterface[] }>;
}

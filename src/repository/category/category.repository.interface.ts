import { CategoryInterface } from '../../client/storage/storage.model';

export interface CategoryRepositoryInterface {
	findAll(): Promise<{ categories: CategoryInterface[] }>;
}

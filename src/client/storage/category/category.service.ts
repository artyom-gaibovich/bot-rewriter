import { Inject, Injectable } from '@nestjs/common';
import { DIConstants } from '../../../constants/DI.constants';
import { CategoryServiceInterface } from './category.service.interface';

@Injectable()
export class CategoryService implements CategoryServiceInterface {
	constructor(@Inject(DIConstants.CategoryServiceConfig) private config) {}

	getAll(): Promise<{ categories: CategoryInterface[] }> {
		throw new Error('Method not implemented.');
	}

	create(req: { categories: CategoryInterface[] }): Promise<{ categories: CategoryInterface[] }> {
		throw new Error('Method not implemented.');
	}

	delete(req: { categories: CategoryInterface[] }): Promise<{ categories: CategoryInterface[] }> {
		throw new Error('Method not implemented.');
	}

	update(req: { categories: CategoryInterface[] }): Promise<{ categories: CategoryInterface[] }> {
		throw new Error('Method not implemented.');
	}
}

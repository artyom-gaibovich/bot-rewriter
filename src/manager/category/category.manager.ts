import { Inject, Injectable } from '@nestjs/common';
import { DIConstants } from '../../constants/DI.constants';
import {
	CategoryInterface,
	CategoryServiceInterface,
} from '../../client/storage/category/category.service.interface';
import { CategoryManagerInterface } from './category.manager.interface';

@Injectable()
export class CategoryManager implements CategoryManagerInterface {
	constructor(
		@Inject(DIConstants.CategoryService) private categoryService: CategoryServiceInterface,
	) {}

	async create(category: {
		categories: CategoryInterface;
	}): Promise<{ categories: CategoryInterface[] }> {
		return await this.categoryService.create(category);
	}

	async delete(category: {
		categories: CategoryInterface;
	}): Promise<{ categories: CategoryInterface[] }> {
		return await this.categoryService.delete(category);
	}

	async getAll(): Promise<{ categories: CategoryInterface[] }> {
		return await this.categoryService.getAll();
	}

	async update(category: {
		categories: CategoryInterface;
	}): Promise<{ categories: CategoryInterface[] }> {
		return await this.categoryService.update(category);
	}
}

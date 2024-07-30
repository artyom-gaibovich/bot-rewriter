import { CategoryRepositoryInterface } from './category.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DIConstants } from '../../constants/DI.constants';
import { CategoryServiceInterface } from '../../client/storage/category/category.service.interface';
import { CategoryInterface } from '../../client/storage/storage.model';

@Injectable()
export class CategoryRepository implements CategoryRepositoryInterface {
	constructor(
		@Inject(DIConstants.CategoryService) private categoryService: CategoryServiceInterface,
	) {}

	async findAll(): Promise<{ categories: CategoryInterface[] }> {
		return this.categoryService.getAll();
	}
}

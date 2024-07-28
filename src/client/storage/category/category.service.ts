import { Inject, Injectable } from '@nestjs/common';
import { DIConstants } from '../../../constants/DI.constants';
import { CategoryServiceInterface } from './category.service.interface';
import axios from 'axios';
import { User } from '../storage.model';
import { CustomLoggerInterface } from '../../../logger/custom-logger.interface';
import { CategoryServiceConfig } from '../../../config/category.service.config';
import { CustomLoggerService } from '../../../logger/custom-logger.service';

@Injectable()
export class CategoryService implements CategoryServiceInterface {
	constructor(
		@Inject(DIConstants.CategoryServiceConfig) private config: CategoryServiceConfig,
		private logger: CustomLoggerService,
	) {}

	async getAll(): Promise<{ categories: CategoryInterface[] }> {
		try {
			const { data } = await axios.get<{ categories: CategoryInterface[] }>(this.config.getAllUrl);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}

	async create(req: {
		categories: CategoryInterface[];
	}): Promise<{ categories: CategoryInterface[] }> {
		try {
			const { data } = await axios.post<{ categories: CategoryInterface[] }>(
				this.config.createUrl,
				req,
			);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}

	async delete(req: {
		categories: CategoryInterface[];
	}): Promise<{ categories: CategoryInterface[] }> {
		try {
			const { data } = await axios.post<{ categories: CategoryInterface[] }>(
				this.config.deleteUrl,
				req,
			);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}

	async update(req: {
		categories: CategoryInterface[];
	}): Promise<{ categories: CategoryInterface[] }> {
		try {
			const { data } = await axios.post<{ categories: CategoryInterface[] }>(
				this.config.updateUrl,
				req,
			);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}
}

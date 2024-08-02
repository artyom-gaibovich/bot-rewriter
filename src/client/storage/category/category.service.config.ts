import { ConfigService } from '@nestjs/config';
import { UrlConstants } from '../../../constants/url.constants';
import { LoggerService } from '@nestjs/common';

export interface CategoryServiceConfig {
	createUrl: string;
	getAllUrl: string;
	deleteUrl: string;
	updateUrl: string;
}

export const categoryServiceConfig = (
	configService: ConfigService,
	logger: LoggerService,
): CategoryServiceConfig => {
	const CreateCategory = configService.get<string>(UrlConstants.CreateCategory);
	const GetAllCategories = configService.get<string>(UrlConstants.GetAllCategories);
	const DeleteCategory = configService.get<string>(UrlConstants.DeleteCategory);
	const UpdateCategory = configService.get<string>(UrlConstants.UpdateCategory);
	const Storage = configService.get<string>(UrlConstants.Storage);

	const context = `[categoryServiceConfig]`;
	if (!Storage) {
		throw new Error(`${context} Environment variable ${UrlConstants.Storage} is not defined`);
	}
	if (!CreateCategory) {
		throw new Error(
			`${context} Environment variable ${UrlConstants.CreateCategory} is not defined`,
		);
	}
	if (!DeleteCategory) {
		throw new Error(`${context}Environment variable ${UrlConstants.DeleteCategory} is not defined`);
	}
	if (!UpdateCategory) {
		throw new Error(
			`${context} Environment variable ${UrlConstants.UpdateCategory} is not defined`,
		);
	}

	return {
		createUrl: `${Storage}${CreateCategory}`,
		getAllUrl: `${Storage}${GetAllCategories}`,
		deleteUrl: `${Storage}${DeleteCategory}`,
		updateUrl: `${Storage}${UpdateCategory}`,
	};
};

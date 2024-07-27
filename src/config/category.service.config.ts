import { ConfigService } from '@nestjs/config';
import { UrlConstants } from '../constants/url.constants';
import { DIConstants } from '../constants/DI.constants';
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
	const createCategoryUrl = configService.get<string>(UrlConstants.CreateCategoryUrl);
	const getAllCategoriesUrl = configService.get<string>(UrlConstants.GetAllCategoriesUrl);
	const deleteCategoryUrl = configService.get<string>(UrlConstants.DeleteCategoryUrl);
	const updateCategoryUrl = configService.get<string>(UrlConstants.UpdateCategoryUrl);
	const context = `[categoryServiceConfig]`;
	if (!createCategoryUrl) {
		throw new Error(
			`${context} Environment variable ${UrlConstants.CreateCategoryUrl} is not defined`,
		);
	}
	if (!getAllCategoriesUrl) {
		throw new Error(
			`${context} Environment variable ${UrlConstants.GetAllCategoriesUrl} is not defined`,
		);
	}
	if (!deleteCategoryUrl) {
		throw new Error(
			`${context}Environment variable ${UrlConstants.DeleteCategoryUrl} is not defined`,
		);
	}
	if (!updateCategoryUrl) {
		throw new Error(
			`${context} Environment variable ${UrlConstants.UpdateCategoryUrl} is not defined`,
		);
	}

	return {
		createUrl: createCategoryUrl,
		getAllUrl: getAllCategoriesUrl,
		deleteUrl: deleteCategoryUrl,
		updateUrl: updateCategoryUrl,
	};
};

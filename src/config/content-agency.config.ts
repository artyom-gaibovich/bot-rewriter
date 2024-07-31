import { ConfigService } from '@nestjs/config';
import { CustomLoggerInterface } from '../logger/custom-logger.interface';
import { UrlConstants } from '../constants/url.constants';
import { UserServiceConfig } from './user.service.config';

export interface ContentAgencyConfig {
	createUrl: string;
	deleteUrl: string;
	deleteSecondaryUrl: string;
}

export const contentAgencyConfig = (
	configService: ConfigService,
	logger: CustomLoggerInterface,
): ContentAgencyConfig => {
	const storageURL = configService.get<string>(UrlConstants.StorageUrl);
	const createUserUrl = configService.get<string>(UrlConstants.CreateUserUrl);
	const context = `[userServiceConfig]`;
	if (!storageURL) {
		throw new Error(`${context} Environment variable ${UrlConstants.StorageUrl} is not defined`);
	}
	if (!createUserUrl) {
		throw new Error(`${context} Environment variable ${UrlConstants.CreateUserUrl} is not defined`);
	}
	if (!getUserUrl) {
		throw new Error(`${context} Environment variable ${UrlConstants.GetUserUrl} is not defined`);
	}
	if (!deleteUserUrl) {
		throw new Error(`${context} Environment variable ${UrlConstants.DeleteUserUrl} is not defined`);
	}
	return {
		createUrl: `${storageURL}${createUserUrl}`,
		getUrl: `${storageURL}${getUserUrl}`,
		deleteUrl: `${storageURL}${deleteUserUrl}`,
	};
};

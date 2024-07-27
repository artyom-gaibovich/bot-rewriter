import { ConfigService } from '@nestjs/config';
import { UrlConstants } from '../constants/url.constants';
import { CustomLoggerInterface } from '../logger/custom-logger.interface';

export interface UserServiceConfig {
	createUrl: string;
	getUrl: string;
	deleteUrl: string;
}

export const userServiceConfig = (
	configService: ConfigService,
	logger: CustomLoggerInterface,
): UserServiceConfig => {
	const createUserUrl = configService.get<string>(UrlConstants.CreateUserUrl);
	const getUserUrl = configService.get<string>(UrlConstants.GetUserUrl);
	const deleteUserUrl = configService.get<string>(UrlConstants.DeleteUserUrl);
	const context = `[userServiceConfig]`;
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
		createUrl: createUserUrl,
		getUrl: getUserUrl,
		deleteUrl: deleteUserUrl,
	};
};

import { ConfigService } from '@nestjs/config';
import { UrlConstants } from '../../../constants/url.constants';
import { CustomLoggerInterface } from '../../../logger/custom-logger.interface';

export interface UserServiceConfig {
	createUrl: string;
	getUrl: string;
	deleteUrl: string;
}

export const userServiceConfig = (
	configService: ConfigService,
	logger: CustomLoggerInterface,
): UserServiceConfig => {
	const Storage = configService.get<string>(UrlConstants.Storage);
	const CreateUser = configService.get<string>(UrlConstants.CreateUser);
	const GetUser = configService.get<string>(UrlConstants.GetUser);
	const DeleteUser = configService.get<string>(UrlConstants.DeleteUser);
	const context = `[userServiceConfig]`;
	if (!Storage) {
		throw new Error(`${context} Environment variable ${UrlConstants.Storage} is not defined`);
	}
	if (!CreateUser) {
		throw new Error(`${context} Environment variable ${UrlConstants.CreateUser} is not defined`);
	}
	if (!GetUser) {
		throw new Error(`${context} Environment variable ${UrlConstants.GetUser} is not defined`);
	}
	if (!DeleteUser) {
		throw new Error(`${context} Environment variable ${UrlConstants.DeleteUser} is not defined`);
	}
	return {
		createUrl: `${Storage}${CreateUser}`,
		getUrl: `${Storage}${GetUser}`,
		deleteUrl: `${Storage}${DeleteUser}`,
	};
};

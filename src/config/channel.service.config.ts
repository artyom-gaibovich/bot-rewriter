import { ConfigService } from '@nestjs/config';
import { UrlConstants } from '../constants/url.constants';
import { CustomLoggerInterface } from '../logger/custom-logger.interface';

export interface ChannelServiceConfig {
	createUrl: string;
	deleteUrl: string;
	deleteSecondaryUrl: string;
}

export const channelServiceConfig = (
	configService: ConfigService,
	logger: CustomLoggerInterface,
): ChannelServiceConfig => {
	const storageURL = configService.get<string>(UrlConstants.StorageUrl);
	const createChannelUrl = configService.get<string>(UrlConstants.CreateChannelUrl);
	const deleteChannelUrl = configService.get<string>(UrlConstants.DeleteChannelUrl);
	const deleteChannelRewriteUrl = configService.get<string>(UrlConstants.DeleteChannelRewriteUrl);
	const context = `[channelServiceConfig]`;
	if (!storageURL) {
		throw new Error(`${context} Environment variable ${UrlConstants.StorageUrl} is not defined`);
	}
	if (!createChannelUrl) {
		throw new Error(
			`${context} Environment variable ${UrlConstants.CreateChannelUrl} is not defined`,
		);
	}
	if (!deleteChannelUrl) {
		throw new Error(
			`${context} Environment variable ${UrlConstants.DeleteChannelUrl} is not defined`,
		);
	}
	if (!deleteChannelRewriteUrl) {
		throw new Error(
			`${context} Environment variable ${UrlConstants.DeleteChannelRewriteUrl} is not defined`,
		);
	}
	return {
		createUrl: `${storageURL}/${createChannelUrl}`,
		deleteSecondaryUrl: `${storageURL}/${deleteChannelRewriteUrl}`,
		deleteUrl: `${storageURL}/${deleteChannelUrl}`,
	};
};

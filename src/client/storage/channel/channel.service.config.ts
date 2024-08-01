import { ConfigService } from '@nestjs/config';
import { UrlConstants } from '../../../constants/url.constants';
import { CustomLoggerInterface } from '../../../logger/custom-logger.interface';
import { DIConstants } from '../../../constants/DI.constants';

export interface ChannelServiceConfig {
	createUrl: string;
	deleteUrl: string;
	deleteSecondaryUrl: string;
	checkUrl: string;
}

export const channelServiceConfig = (
	configService: ConfigService,
	logger: CustomLoggerInterface,
): ChannelServiceConfig => {
	const Storage = configService.get<string>(UrlConstants.Storage);
	const ContentAgency = configService.get<string>(UrlConstants.ContentAgency);

	const CreateChannel = configService.get<string>(UrlConstants.CreateChannel);
	const CheckChannel = configService.get<string>(UrlConstants.CheckChannel);
	const DeleteChannel = configService.get<string>(UrlConstants.DeleteChannel);
	const DeleteChannelRewrite = configService.get<string>(UrlConstants.DeleteChannelRewrite);
	const context = `[${DIConstants.ChannelServiceConfig}]`;
	if (!Storage) {
		throw new Error(`${context} Environment variable ${UrlConstants.Storage} is not defined`);
	}

	if (!ContentAgency) {
		throw new Error(`${context} Environment variable ${UrlConstants.ContentAgency} is not defined`);
	}
	if (!CreateChannel) {
		throw new Error(`${context} Environment variable ${UrlConstants.CreateChannel} is not defined`);
	}
	if (!CheckChannel) {
		throw new Error(`${context} Environment variable ${UrlConstants.CheckChannel} is not defined`);
	}
	if (!DeleteChannel) {
		throw new Error(`${context} Environment variable ${UrlConstants.DeleteChannel} is not defined`);
	}
	if (!DeleteChannelRewrite) {
		throw new Error(
			`${context} Environment variable ${UrlConstants.DeleteChannelRewrite} is not defined`,
		);
	}
	return {
		createUrl: `${Storage}${CreateChannel}`,
		deleteSecondaryUrl: `${Storage}${DeleteChannelRewrite}`,
		deleteUrl: `${Storage}${DeleteChannel}`,
		checkUrl: `${ContentAgency}${CheckChannel}`,
	};
};

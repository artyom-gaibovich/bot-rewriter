import { ConfigService } from '@nestjs/config';
import { CustomLoggerInterface } from '../../../logger/custom-logger.interface';
import { UrlConstants } from '../../../constants/url.constants';
import { DIConstants } from '../../../constants/DI.constants';

export interface TextServiceConfig {
	rewriteText: string;
}

export const textServiceConfig = (
	configService: ConfigService,
	logger: CustomLoggerInterface,
): TextServiceConfig => {
	const ContentAgency = configService.get<string>(UrlConstants.ContentAgency);

	const RewriteText = configService.get<string>(UrlConstants.RewriteText);
	const context = `[${DIConstants.TextServiceConfig}]`;

	if (!ContentAgency) {
		throw new Error(`${context} Environment variable ${UrlConstants.ContentAgency} is not defined`);
	}

	if (!RewriteText) {
		throw new Error(`${context} Environment variable ${UrlConstants.RewriteText} is not defined`);
	}
	return {
		rewriteText: `${ContentAgency}${RewriteText}`,
	};
};

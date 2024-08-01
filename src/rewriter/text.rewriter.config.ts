import { ConfigService } from '@nestjs/config';
import { CustomLoggerInterface } from '../logger/custom-logger.interface';
import { DIConstants } from '../constants/DI.constants';
import { EnvConstants } from '../constants/env.constants';

export interface TextRewriterConfig {
	limit: number;
}

export const textRewriterConfig = (
	configService: ConfigService,
	logger: CustomLoggerInterface,
): TextRewriterConfig => {
	const RewriteTextLimit = Number(configService.get<string>(EnvConstants.RewriteTextLimit));
	const context = `[${DIConstants.TextRewriterConfig}]`;

	if (!RewriteTextLimit) {
		throw new Error(
			`${context} Environment variable ${EnvConstants.RewriteTextLimit} is not defined`,
		);
	}

	if (typeof RewriteTextLimit !== 'number') {
		throw new Error(
			`${context} Environment variable ${EnvConstants.RewriteTextLimit} is not number`,
		);
	}
	return {
		limit: RewriteTextLimit,
	};
};

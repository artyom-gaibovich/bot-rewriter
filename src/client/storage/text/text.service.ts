import { TextServiceInterface } from './text.service.interface';
import { LinkInterface } from '../../../model/link/link.interface';
import axios from 'axios';
import { Inject } from '@nestjs/common';
import { DIConstants } from '../../../constants/DI.constants';
import { CustomLoggerService } from '../../../logger/custom-logger.service';
import { TextServiceConfig } from './text.service.config';

export class TextService implements TextServiceInterface {
	constructor(
		@Inject(DIConstants.TextServiceConfig) private config: TextServiceConfig,
		private logger: CustomLoggerService,
	) {}

	async rewrite(req: { prompt: string; links: LinkInterface[]; limit?: number }): Promise<{
		response_key: string;
		response_message: string;
		data: string;
	}> {
		try {
			const { data } = await axios.post<{
				response_key: string;
				response_message: string;
				data: string;
			}>(this.config.rewriteText, req);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}
}

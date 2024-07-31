import { Logger } from 'tslog';
import { CustomLoggerInterface } from './custom-logger.interface';
import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CustomLoggerService implements CustomLoggerInterface {
	public logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
			logLevelsColors: {
				0: 'black',
				1: 'green',
				2: 'yellow',
				3: 'blue',
				4: 'yellowBright',
				5: 'red',
				6: 'inverse',
			},
		});
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		if (axios.isAxiosError(args[0])) {
			const { message, config, response, request, stack } = args[0];
			this.logger.error('Axios error:', {
				message,
				url: config.url,
				method: config.method,
				headers: config.headers,
				requestData: config.data,
				status: response?.status,
				responseData: response?.data,
				responseHeaders: response?.headers,
				stack,
			});
		} else {
			this.logger.error(...args);
		}
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}

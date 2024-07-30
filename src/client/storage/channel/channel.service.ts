import { Inject, Injectable } from '@nestjs/common';
import { User } from '../storage.model';
import { ChannelServiceInterface } from './channel.service.interface';
import { DIConstants } from '../../../constants/DI.constants';
import axios from 'axios';
import { ChannelServiceConfig } from '../../../config/channel.service.config';
import { CustomLoggerInterface } from '../../../logger/custom-logger.interface';
import { CustomLoggerService } from '../../../logger/custom-logger.service';

@Injectable()
export class ChannelService implements ChannelServiceInterface {
	constructor(
		@Inject(DIConstants.ChannelServiceConfig) private config: ChannelServiceConfig,
		private logger: CustomLoggerService,
	) {}

	async create(req: { user: User }): Promise<{ user: User }> {
		try {
			const { data } = await axios.post<{ user: User }>(this.config.createUrl, req);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}

	async delete(req: { user: User }): Promise<{ user: User }> {
		try {
			const { data } = await axios.post<{ user: User }>(this.config.deleteUrl, req);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}

	async deleteSecondary(req: { user: User }): Promise<{ user: User }> {
		try {
			const { data } = await axios.post<{ user: User }>(this.config.deleteSecondaryUrl, req);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}
}

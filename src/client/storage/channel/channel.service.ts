import { Inject, Injectable } from '@nestjs/common';
import { User } from '../storage.model';
import { ChannelServiceInterface } from './channel.service.interface';
import { DIConstants } from '../../../constants/DI.constants';
import axios from 'axios';
import { ChannelServiceConfig } from './channel.service.config';
import { CustomLoggerService } from '../../../logger/custom-logger.service';

@Injectable()
export class ChannelService implements ChannelServiceInterface {
	constructor(
		@Inject(DIConstants.ChannelServiceConfig) private config: ChannelServiceConfig,
		private logger: CustomLoggerService,
	) {}

	async create(user: { user: User }): Promise<{ user: User }> {
		try {
			const { data } = await axios.post<{ user: User }>(this.config.createUrl, user);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}

	async delete(user: { user: User }): Promise<{ user: User }> {
		try {
			const { data } = await axios.post<{ user: User }>(this.config.deleteUrl, user);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}

	async deleteSecondary(user: { user: User }): Promise<{ user: User }> {
		try {
			const { data } = await axios.post<{ user: User }>(this.config.deleteSecondaryUrl, user);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}

	async check(channels: { links: { link: string }[] }): Promise<{
		checkedChannels: { status: string; channelLink: string; isChannelExists: boolean }[];
	}> {
		try {
			const { data } = await axios.post<{
				checkedChannels: { status: string; channelLink: string; isChannelExists: boolean }[];
			}>(this.config.checkUrl, channels);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}
}

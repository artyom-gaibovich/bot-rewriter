import { Inject, Injectable } from '@nestjs/common';
import { User } from '../storage.model';
import { UserServiceInterface } from './user.service.interface';
import { DIConstants } from '../../../constants/DI.constants';
import { HttpService } from '@nestjs/axios';
import { UserServiceConfig } from '../../../config/user.service.config';
import axios from 'axios';
import { UserInterface } from '../../../model/user.interface';
import { Logger } from 'tslog';
import { CustomLoggerInterface } from '../../../logger/custom-logger.interface';
import { CustomLoggerService } from '../../../logger/custom-logger.service';

@Injectable()
export class UserService implements UserServiceInterface {
	constructor(
		@Inject(DIConstants.UserServiceConfig) private config: UserServiceConfig,
		private logger: CustomLoggerService,
	) {}

	async create(req: { user: User }): Promise<{ user: User }> {
		try {
			const { data } = await axios.post<{ user: User }>(this.config.getUrl, req);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}

	async get(req: { user: User }): Promise<{ user: User }> {
		try {
			const { data } = await axios.post<{ user: User }>(this.config.getUrl, req);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}

	async delete(req: { user: User }): Promise<{ user: User }> {
		try {
			const { data } = await axios.post<{ user: User }>(this.config.getUrl, req);
			return data;
		} catch (error) {
			this.logger.error(error);
		}
	}
}

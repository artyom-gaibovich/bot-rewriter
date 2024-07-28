import { Inject, Injectable } from '@nestjs/common';
import { User } from '../storage.model';
import { UserServiceInterface } from './user.service.interface';
import { DIConstants } from '../../../constants/DI.constants';
import { HttpService } from '@nestjs/axios';
import { UserServiceConfig } from '../../../config/user.service.config';
import axios from 'axios';

@Injectable()
export class UserService implements UserServiceInterface {
	constructor(@Inject(DIConstants.UserServiceConfig) private config: UserServiceConfig) {}

	create(req: { user: User }): Promise<{ user: User }> {
		throw new Error('Method not implemented.');
	}

	async get(req: { user: User }): Promise<{ user: User }> {
		const { data } = await axios.post<{ user: User }>(this.config.getUrl, {});
		return data;
	}

	delete(req: { user: User }): Promise<{ user: User }> {
		throw new Error('Method not implemented.');
	}
}

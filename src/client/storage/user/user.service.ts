import { Inject, Injectable } from '@nestjs/common';
import { User } from '../storage.model';
import { UserServiceInterface } from './user.service.interface';
import { DIConstants } from '../../../constants/DI.constants';

@Injectable()
export class UserService implements UserServiceInterface {
	constructor(@Inject(DIConstants.UserServiceConfig) private config) {}

	create(req: { user: User }): Promise<{ user: User }> {
		throw new Error('Method not implemented.');
	}

	get(req: { user: User }): Promise<{ user: User }> {
		throw new Error('Method not implemented.');
	}

	delete(req: { user: User }): Promise<{ user: User }> {
		throw new Error('Method not implemented.');
	}
}

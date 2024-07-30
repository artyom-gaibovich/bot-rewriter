import { UserManagerInterface } from './user.manager.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DIConstants } from '../../constants/DI.constants';
import { User } from '../../client/storage/storage.model';
import { UserServiceInterface } from '../../client/storage/user/user.service.interface';

@Injectable()
export class UserManager implements UserManagerInterface {
	constructor(@Inject(DIConstants.UserService) private userService: UserServiceInterface) {}

	async create(user: { user: User }): Promise<{ user: User }> {
		return this.userService.create(user);
	}

	async delete(user: { user: User }): Promise<{ user: User }> {
		return this.userService.delete(user);
	}
}

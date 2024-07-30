import { UserRepositoryInterface } from './user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DIConstants } from '../../constants/DI.constants';
import { User } from '../../client/storage/storage.model';
import { UserServiceInterface } from '../../client/storage/user/user.service.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
	constructor(@Inject(DIConstants.UserService) private userService: UserServiceInterface) {}

	async findOne(user: { user: User }): Promise<{ user: User }> {
		return this.userService.get(user);
	}
}

import { UserRepositoryInterface } from './user.repository.interface';
import { UserInterface } from '../../model/user.interface';
import { Inject, Injectable } from '@nestjs/common';
import { StorageClientInterfaceOld } from '../../client/storage/storage.client.interface.old';
import { STORAGE_CLIENT } from '../../constants/DI.constants';
import { USER_REPOSITORY_LINK_CONFIG } from '../../constants/enviroment.constants';
import { UserRepositoryLinkConfig } from './user.repository.link.config';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
	constructor(
		@Inject(USER_REPOSITORY_LINK_CONFIG) private config: UserRepositoryLinkConfig,
		@Inject(STORAGE_CLIENT) private client: StorageClientInterfaceOld,
	) {}

	async get(telegramId: number): Promise<UserInterface> {
		const data = await this.client.getUser({
			url: this.config.get,
			body: {
				user: {
					id: telegramId,
				},
			},
		});
		return data.body as UserInterface;
	}
}

import { User } from '../../client/storage/storage.model';

export interface UserManagerInterface {
	create(user: { user: User }): Promise<{ user: User }>;

	delete(user: { user: User }): Promise<{ user: User }>;
}

import { User } from '../../client/storage/storage.model';

export interface ChannelManagerInterface {
	create(user: { user: User }): Promise<{ user: User }>;

	delete(user: { user: User }): Promise<{ user: User }>;

	deleteSecondary(user: { user: User }): Promise<{ user: User }>;
}

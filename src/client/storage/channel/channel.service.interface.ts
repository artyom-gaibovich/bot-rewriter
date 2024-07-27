import { User } from '../storage.model';

export interface ChannelServiceInterface {
	add(req: { user: User }): Promise<{ user: User }>;

	delete(req: { user: User }): Promise<{ user: User }>;
}

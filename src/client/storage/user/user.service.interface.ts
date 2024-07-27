import { User } from '../storage.model';

export interface UserServiceInterface {
	create(req: { user: User }): Promise<{ user: User }>;

	get(req: { user: User }): Promise<{ user: User }>;

	delete(req: { user: User }): Promise<{ user: User }>;
}

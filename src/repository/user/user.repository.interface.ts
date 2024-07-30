import { UserInterface } from '../../model/user.interface';
import { User } from '../../client/storage/storage.model';

export interface UserRepositoryInterface {
	findOne(user: { user: User }): Promise<{ user: User }>;
}

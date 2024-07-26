import { UserInterface } from '../../model/user.interface';

export interface UserManagerInterface {
	createUser(user: UserInterface): Promise<UserInterface>;

	deleteUser(user: UserInterface): Promise<UserInterface>;
}

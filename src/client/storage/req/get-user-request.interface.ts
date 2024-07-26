import { LinkInterface } from '../../../model/link/link.interface';
import { UserInterface } from '../../../model/user.interface';

export interface GetUserRequestInterface {
	url: LinkInterface;
	body: UserInterface;
}

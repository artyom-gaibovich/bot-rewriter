import { LinkInterface } from '../../../model/link/link.interface';
import { UserInterface } from '../../../model/user.interface';

export interface AddChannelRequestInterface {
	url: LinkInterface;
	body: UserInterface;
}

import { UserInterface } from '../../../model/user.interface';
import { LinkInterface } from '../../../model/link/link.interface';

export interface DeleteChannelRequestInterface {
	url: LinkInterface;
	body: UserInterface;
}

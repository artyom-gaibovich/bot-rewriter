import { UserChannelInterface } from '../client/storage/storage.model';

export interface UserInterface {
	user: {
		id: number;
		username?: string;
		userChannels?: UserChannelInterface[];
	};
}

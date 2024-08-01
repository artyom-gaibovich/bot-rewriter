import { User } from '../storage.model';

export interface ChannelServiceInterface {
	create(user: { user: User }): Promise<{ user: User }>;

	delete(user: { user: User }): Promise<{ user: User }>;

	deleteSecondary(user: { user: User }): Promise<{ user: User }>;

	check(channels: { links: { link: string }[] }): Promise<{
		checkedChannels: {
			status: string;
			channelLink: string;
			isChannelExists: boolean;
		}[];
	}>;
}

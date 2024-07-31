import { User } from '../storage.model';

export interface ChannelServiceInterface {
	create(req: { user: User }): Promise<{ user: User }>;

	delete(req: { user: User }): Promise<{ user: User }>;

	deleteSecondary(req: { user: User }): Promise<{ user: User }>;

	checkChannel(req: { links: { link: string }[] }): Promise<{
		checkedChannels: {
			status: string;
			channelLink: string;
			isChannelExists: boolean;
		}[];
	}>;
}

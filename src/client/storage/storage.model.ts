import { CategoryInterface } from './category/category.service.interface';

export interface User {
	id: number;
	userChannels?: UserChannelInterface[];
}

export interface UserChannelInterface {
	userChannel?: ChannelInterface | {};
	channelsToRewrite?: ChannelInterface[];
}

export interface ChannelInterface {
	link: string;
	category?: CategoryInterface;
}

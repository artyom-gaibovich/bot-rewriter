export interface User {
	id: number;
	userChannels?: UserChannelInterface[];
}

export interface UserChannelInterface {
	userChannel?: ChannelInterface | {};
	channelsToRewrite?: ChannelInterface[];
}

export interface CategoryInterface {
	title: string;
	value: string;
	sequence?: number;
	prompt?: string;
}

export interface ChannelInterface {
	link: string;
	category?: CategoryInterface;
}

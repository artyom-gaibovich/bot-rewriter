export interface User {
	id: number;
	userChannels?: UserChannel[];
}

export interface UserChannel {
	userChannel: NewChannelInterface;
	channelsToRewrite: NewChannelInterface[];
}

export interface NewCategoryInterface {
	value?: string;
	sequence?: string;
	title?: string;
	prompt?: string;
}

export interface NewChannelInterface {
	link: string;
	category?: NewCategoryInterface;
}

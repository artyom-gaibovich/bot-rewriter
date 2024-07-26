import { ChannelLinkInterface } from './link/channel.link.interface';

export interface UserChannelInterface {
	userChannel?: ChannelLinkInterface | {};
	channelsToRewrite?: ChannelLinkInterface[];
}

export interface UserChannelsInterface {
	userChannels: UserChannelInterface[];
}

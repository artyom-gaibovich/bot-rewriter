export interface ChannelCheckerInterface {
	check(channels: { link: string }[]): Promise<{
		checkedChannels: {
			channelLink: string;
			isChannelExists: boolean;
		}[];
	}>;
}

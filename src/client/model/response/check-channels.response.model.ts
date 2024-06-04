interface ChannelStatus {
    status: string;
    channelLink: string;
    isChannelExists: boolean;
}

interface CheckChannelsResponse {
    checkedChannels: ChannelStatus[];
}
interface ChannelStatus {
    status: string;
    channelLink: string;
    isChannelExists: boolean;
}

interface AddChannelsResponseModel {
    checkedChannels: ChannelStatus[];
}
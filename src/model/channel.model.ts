import {LinkInterface} from "../../model/link/link.interface";
import {ChannelLinkInterface} from "../../model/link/channel.link.interface";

export interface UserChannel {
    userChannel : ChannelLinkInterface
    channelsToRewrite : ChannelLinkInterface[]
}
export interface UserChannels {
    userChannels : UserChannel[]
}
import {LinkInterface} from "./link/link.interface";
import {ChannelLinkInterface} from "./link/channel.link.interface";

export interface UserChannelInterface {
    userChannel : ChannelLinkInterface
    channelsToRewrite : ChannelLinkInterface[]
}

import {ChannelLinkInterface} from "../../model/link/channel.link.interface";

export interface ChannelManagerLinkConfig {
    addChannel : ChannelLinkInterface
    deleteChannel  : ChannelLinkInterface
    deleteChannelToRewrite :  ChannelLinkInterface
}
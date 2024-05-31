import {LinkModel} from "./link.model";

export interface ChannelModel {
    link : LinkModel
    channelsToRewrite : LinkModel[]
}
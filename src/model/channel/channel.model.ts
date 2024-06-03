import {LinkModel} from "../link/link.model";

export interface ChannelModel {
    link : LinkModel
    channelsToRewrite : LinkModel[]
}
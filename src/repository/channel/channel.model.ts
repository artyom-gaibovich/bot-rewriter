import {LinkModel} from "../../model/link/link.model";

export interface UserChannel {
    userChannel : LinkModel
    channelsToRewrite : LinkModel[]
}
export interface UserChannels {
    userChannels : UserChannel[]
}
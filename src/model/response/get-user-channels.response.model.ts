import {LinkModel} from "../link/link.model";


export interface UserChannel {
    userChannel : LinkModel
    channelsToRewrite : LinkModel[]
}
export interface GetUserChannelsResponseModel {
    userChannels : UserChannel[]
}
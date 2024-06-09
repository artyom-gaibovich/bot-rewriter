import {LinkInterface} from "../../../../model/link/link.interface";


interface UserChannelInterface {
    userChannel : LinkInterface
    channelsToRewrite : LinkInterface[]

}

export interface CreateChannelsRequestInterface {
    user : {
        id : number
        username : string
        userChannels :  UserChannelInterface[]
    }
}
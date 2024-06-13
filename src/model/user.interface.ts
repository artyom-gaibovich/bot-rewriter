import {UserChannelInterface} from "./channel.interface";

export interface UserInterface {
    user : {
        id : number
        username? : string
        userChannels? : UserChannelInterface[]
    }
}
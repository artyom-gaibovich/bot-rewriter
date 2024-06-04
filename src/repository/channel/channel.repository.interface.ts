import {UserChannels} from "./channel.model";

export interface ChannelRepositoryInterface {
    findById(id : number): Promise<UserChannels>
}
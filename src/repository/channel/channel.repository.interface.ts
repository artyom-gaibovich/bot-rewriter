import {UserChannel, UserChannels} from "./channel.model";

export interface ChannelRepositoryInterface {
    findById(id : number): Promise<UserChannels>
    findOne(id : number): Promise<UserChannel>
}
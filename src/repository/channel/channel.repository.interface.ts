import {UserChannel, UserChannels} from "../../model/channel.model";

export interface ChannelRepositoryInterface {
    findById(id : number): Promise<UserChannels>
    findOne(id : number): Promise<UserChannel>
}
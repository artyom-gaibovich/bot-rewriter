import {ChannelModel} from "../model/channel.model";

export interface ChannelRepositoryInterface {
    findById(id : number) : Promise<ChannelModel[]>
}
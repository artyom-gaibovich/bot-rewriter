import {ChannelRepositoryInterface} from "./channel.repository.interface";
import {ChannelModel} from "../model/channel.model";
import {AddChannelsRequestModel} from "../model/request/add-channels.request.model";
import {SendToCheckChannelsAction} from "../actions/send-to-check-channels/send-to-check-channels.action";

export class ChannelRepository {
    constructor(private sendToCheckChannelsAction : SendToCheckChannelsAction) {
    }

    async checkByLinks(channels: AddChannelsRequestModel) : Promise<AddChannelsResponseModel> {
        return await this.sendToCheckChannelsAction.send(channels)
    }
    async findById(id: number): Promise<ChannelModel[]> {
        //делаю здесь заглушку
        return  await new Promise<ChannelModel[]>(resolve => () => {
            setTimeout(() => {
                resolve([
                    {link : {link : 'some_chan'}, channelsToRewrite : [
                            {link : 'https://t.me/zakodirovanna_telega'},
                            {link : 'https://t.me/zakodirovanna_telega'}
                        ]}
                ])
            }, 5000)
        })
    }
}
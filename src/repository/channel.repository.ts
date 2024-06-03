import {ChannelRepositoryInterface} from "./channel.repository.interface";
import {ChannelModel} from "../model/channel.model";
import {AddChannelsRequestModel} from "../model/request/add-channels.request.model";
import {SendToCheckChannelsAction} from "../actions/send-to-check-channels/send-to-check-channels.action";
import {AddChannelsConvertRequestAction} from "../actions/convert-request/add-channels-convert-request.action";
import {LinkModel} from "../model/link.model";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ChannelRepository {
    constructor(
        private sendToCheckChannelsAction : SendToCheckChannelsAction,
        private addChannelsConvertRequestAction : AddChannelsConvertRequestAction
    ) {
    }

    async checkByLinks(channelsLinks: LinkModel[]) : Promise<AddChannelsResponseModel> {
        return await this.sendToCheckChannelsAction.send(
            this.addChannelsConvertRequestAction.convert(channelsLinks)
        )
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
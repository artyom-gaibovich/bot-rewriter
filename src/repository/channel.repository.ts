import {ChannelModel} from "../model/channel.model";
import {SendToCheckChannelsAction} from "../actions/send-to-check-channels/send-to-check-channels.action";
import {AddChannelsConvertRequestAction} from "../actions/convert-request/add-channels-convert-request.action";
import {LinkModel} from "../model/link.model";
import {Injectable} from "@nestjs/common";
import {UserModel} from "../model/user.model";
import {GetChannelsAction} from "../actions/get-channels/get-channels.action";
import {GetUserChannelsResponseModel} from "../model/response/get-user-channels.response.model";

@Injectable()
export class ChannelRepository {
    constructor(
        private sendToCheckChannelsAction : SendToCheckChannelsAction,
        private addChannelsConvertRequestAction : AddChannelsConvertRequestAction,
        private getChannelsAction : GetChannelsAction,
    ) {
    }

    async checkByLinks(channelsLinks: LinkModel[]) : Promise<AddChannelsResponseModel> {
        return await this.sendToCheckChannelsAction.send(
            this.addChannelsConvertRequestAction.convert(channelsLinks)
        )
    }
    async findById(user : UserModel): Promise<GetUserChannelsResponseModel> {
        return await this.getChannelsAction.get(user)
    }
}
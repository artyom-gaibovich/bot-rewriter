import {ChannelModel} from "../../model/channel/channel.model";
import {SendToCheckChannelsAction} from "../../actions/send-to-check-channels/send-to-check-channels.action";
import {AddChannelsConvertRequestAction} from "../../actions/convert-request/add-channels-convert-request.action";
import {LinkModel} from "../../model/link/link.model";
import {Injectable} from "@nestjs/common";
import {UserModel} from "../../model/user/user.model";
import {GetChannelsAction} from "../../actions/get-channels/get-channels.action";
import {GetUserChannelsResponseModel} from "../../model/response/get-user-channels.response.model";
import {ChannelRepositoryInterface} from "./channel.repository.interface";

@Injectable()
export class ChannelRepository implements ChannelRepositoryInterface{
    constructor(
        private getChannelsAction : GetChannelsAction,
    ) {
    }


    async findById(user : UserModel): Promise<GetUserChannelsResponseModel> {
        return await this.getChannelsAction.get(user)
    }
}
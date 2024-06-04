import {ChannelModel} from "../../model/channel/channel.model";
import {UserModel} from "../../model/user/user.model";
import {GetUserChannelsResponseModel} from "../../model/response/get-user-channels.response.model";
import {LinkModel} from "../../model/link/link.model";

export interface ChannelRepositoryInterface {
    findById(user : UserModel): Promise<GetUserChannelsResponseModel>
}
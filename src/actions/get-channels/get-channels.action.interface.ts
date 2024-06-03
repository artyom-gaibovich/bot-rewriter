import {UserModel} from "../../model/user.model";
import {GetUserChannelsResponseModel} from "../../model/response/get-user-channels.response.model";

export interface GetChannelsActionInterface {
    get(user : UserModel) : Promise<GetUserChannelsResponseModel>
}
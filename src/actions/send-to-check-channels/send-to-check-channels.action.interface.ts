import {AddChannelsRequestModel} from "../model/request/add-channels.request.model";

export interface SendToCheckChannelsActionInterface {
    send(channels : AddChannelsRequestModel) : Promise<AddChannelsResponseModel>
}
import {LinkModel} from "../../model/link/link.model";
import {AddChannelsRequestModel} from "../../model/request/add-channels.request.model";

export interface AddChannelsConvertRequestActionInterface {
    convert(channelLinks : LinkModel[]) : AddChannelsRequestModel
}
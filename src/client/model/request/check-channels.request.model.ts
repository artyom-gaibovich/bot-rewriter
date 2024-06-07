import {LinkModel} from "../../../model/link/link.model";

export interface CheckChannelsRequestModel {
    url : LinkModel
    body : {
        links : LinkModel[]
    }
}
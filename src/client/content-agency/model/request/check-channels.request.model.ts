import {LinkInterface} from "../../../model/link/link.interface";

export interface CheckChannelsRequestModel {
    url : LinkInterface
    body : {
        links : LinkInterface[]
    }
}
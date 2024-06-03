import {LinkModel} from "../../model/link/link.model";
import {AddChannelsRequestModel} from "../../model/request/add-channels.request.model";
import {Injectable} from "@nestjs/common";
import {AddChannelsConvertRequestActionInterface} from "./add-channels-convert-request.action.interface";

@Injectable()
export class AddChannelsConvertRequestAction implements AddChannelsConvertRequestActionInterface{
    convert(channelLinks : LinkModel[]) : AddChannelsRequestModel {
        return {
            links : channelLinks.map((link) => {
                return {link : link.link}
            })
        }
    }
}
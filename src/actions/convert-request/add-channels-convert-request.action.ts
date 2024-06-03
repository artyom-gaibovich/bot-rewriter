import {LinkModel} from "../../model/link.model";
import {AddChannelsRequestModel} from "../../model/request/add-channels.request.model";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AddChannelsConvertRequestAction {
    convert(channelLinks : LinkModel[]) : AddChannelsRequestModel {
        return {
            links : channelLinks.map((link) => {
                return {link : link.link}
            })
        }
    }
}
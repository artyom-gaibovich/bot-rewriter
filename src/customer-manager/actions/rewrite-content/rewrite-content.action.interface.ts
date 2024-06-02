import {ChannelModel} from "../../../model/channel.model";
import {RewriteContentResponseModel} from "../../../model/response/rewrite-content.response.model";

export interface RewriteContentActionInterface {
    rewriteContent(channel : ChannelModel) : Promise<RewriteContentResponseModel>
}
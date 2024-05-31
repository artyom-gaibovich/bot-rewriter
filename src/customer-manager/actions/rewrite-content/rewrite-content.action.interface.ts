import {ChannelModel} from "../../../model/channel.model";
import {ContentModel} from "../../../model/content.model";

export interface RewriteContentActionInterface {
    rewriteContent(channel : ChannelModel) : Promise<ContentModel>
}
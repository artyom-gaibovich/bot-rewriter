import {ChannelsToRewriteModel} from "./model/channels-to-rewrite.model";
import {RewrittenContentModel} from "./model/rewritten-content.model";

export interface ContentRewriterInterface {
    rewrite(channelsToRewrite : ChannelsToRewriteModel) : Promise<RewrittenContentModel>
}
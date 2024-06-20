import {ChannelsToRewriteModel} from "./model/channels-to-rewrite.model";
import {RewrittenContentModel} from "./model/rewritten-content.model";
import {PromptInterface} from "../model/prompt.interface";

export interface ContentRewriterInterface {
    rewrite(channelsToRewrite : ChannelsToRewriteModel, prompt : PromptInterface) : Promise<RewrittenContentModel>
}
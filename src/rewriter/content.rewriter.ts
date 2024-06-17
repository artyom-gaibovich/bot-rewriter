import {ContentRewriterInterface} from "./content.rewriter.interface";
import {ChannelsToRewriteModel} from "./model/channels-to-rewrite.model";
import {RewrittenContentModel} from "./model/rewritten-content.model";
import {ContentAgencyClientInterface} from "../client/content-agency/content-agency.client.interface";
import {LinkInterface} from "../model/link/link.interface";
import {Inject, Injectable} from "@nestjs/common";
import {CONTENT_REWRITER_LINK_CONFIG} from "../constants/enviroment.constants";
import {ContentRewriterLinkConfig} from "./content.rewriter.link.config";

@Injectable()
export class ContentRewriter implements ContentRewriterInterface {
    constructor(@Inject(CONTENT_REWRITER_LINK_CONFIG) private config : ContentRewriterLinkConfig, private client : ContentAgencyClientInterface) {
    }
    async rewrite(channelsToRewrite: ChannelsToRewriteModel): Promise<RewrittenContentModel> {
        const response = await this.client.rewriteContent({
            url : this.config.rewrite,
            body: {
                links : channelsToRewrite.channelsToRewrite,
                limit : 3
            }
        })
        return {
            rewrittenContent : response.data
        }
    }
}
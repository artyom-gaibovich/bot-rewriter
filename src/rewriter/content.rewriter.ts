import {ContentRewriterInterface} from "./content.rewriter.interface";
import {ChannelsToRewriteModel} from "./model/channels-to-rewrite.model";
import {RewrittenContentModel} from "./model/rewritten-content.model";
import {ContentAgencyClientInterface} from "../client/content-agency/content-agency.client.interface";
import {LinkInterface} from "../model/link/link.interface";
import {Inject, Injectable} from "@nestjs/common";
import {CONTENT_REWRITER_LINK_CONFIG} from "../constants/enviroment.constants";
import {ContentRewriterConfig} from "./content.rewriter.config";
import {CONTENT_AGENCY_CLIENT} from "../constants/DI.constants";

@Injectable()
export class ContentRewriter implements ContentRewriterInterface {
    constructor(
        @Inject(CONTENT_REWRITER_LINK_CONFIG) private config : ContentRewriterConfig,
        @Inject(CONTENT_AGENCY_CLIENT) private client : ContentAgencyClientInterface) {
    }
    async rewrite(channelsToRewrite: ChannelsToRewriteModel): Promise<RewrittenContentModel> {
        const response = await this.client.rewriteContent({
            url : this.config.rewriteLink,
            body: {
                links : channelsToRewrite.channelsToRewrite,
                limit : this.config.limit // вот тут задается лимит на посты.
            }
        })
        return {
            rewrittenContent : response.data
        }
    }
}
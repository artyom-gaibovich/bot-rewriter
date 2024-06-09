import {ContentRewriterInterface} from "./content.rewriter.interface";
import {ChannelsToRewriteModel} from "./model/channels-to-rewrite.model";
import {RewrittenContentModel} from "./model/rewritten-content.model";
import {ContentAgencyClientInterface} from "../client/content-agency.client.interface";
import {LinkInterface} from "../model/link/link.interface";
import {Inject, Injectable} from "@nestjs/common";

@Injectable()
export class ContentRewriter implements ContentRewriterInterface {
    constructor(private url : LinkInterface, private client : ContentAgencyClientInterface) {
    }
    async rewrite(channelsToRewrite: ChannelsToRewriteModel): Promise<RewrittenContentModel> {
        const response = await this.client.rewriteContent({
            url : this.url,
            body: {
                links : channelsToRewrite.channelsToRewrite,
                limit : 3
            }
        })
        //ошибка возникает, если канала не существует, надо исправить.
        return {
            rewrittenContent : response.channelsWithPosts.map(chn => {
                return chn.posts.join('')
            }).join('')
        }
    }
}
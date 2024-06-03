import {RewriteContentAction} from "../actions/rewrite-content/rewrite-content.action";
import {RewriteContentResponseNewModel} from "../model/response/rewrite-content.response.model";
import {LinkModel} from "../model/link.model";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ContentManager {
    constructor(private rewriteContentAction : RewriteContentAction) {
    }
    async rewrite(channelsLinks : LinkModel[]) : Promise<RewriteContentResponseNewModel> {
        return await this.rewriteContentAction.rewrite(channelsLinks)
    }
}
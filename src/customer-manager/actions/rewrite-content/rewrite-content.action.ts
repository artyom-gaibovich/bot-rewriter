import {RewriteContentActionInterface} from "./rewrite-content.action.interface";
import {ChannelModel} from "../../../model/channel.model";
import {RewriteContentResponseModel} from "../../../model/response/rewrite-content.response.model";
import {RewriteContentRequestModel} from "../../../model/request/rewrite-content.request.model";
import {inject, injectable} from "inversify";
import {DI} from "../../../DI";
import {RewriteContentActionConfig} from "../../../config/rewrite-content-action.config";
import axios from "axios"

@injectable()
export class RewriteContentAction implements RewriteContentActionInterface {
    constructor(@inject(DI.RewriteContentActionConfig) private config : RewriteContentActionConfig) {
    }
    async rewriteContent(channel: ChannelModel): Promise<RewriteContentResponseModel> {
        const request : RewriteContentRequestModel = {
            links : channel.channelsToRewrite
        }
        //Здесь может появится потенциальная ошибка, что делать?
        const response  = await axios.post<RewriteContentRequestModel>(this.config.getUrl(), request)
        //На бэкэнде, надо чтобы один только текст выдавался !

        return {
            rewriteContent : {
                text : '1212121'
            }
        }

    }
}
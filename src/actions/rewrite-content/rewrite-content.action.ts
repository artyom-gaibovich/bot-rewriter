import {LinkModel} from "../../model/link/link.model";
import axios from "axios";
import {RewriteContentResponseNewModel} from "../../model/response/rewrite-content.response.model";
import {RewriteContentActionConfig} from "./rewrite-content.action.config";
import {Injectable} from "@nestjs/common";
import {RewriteContentRequestModel} from "../../model/request/rewrite-content.request.model";
import {RewriteContentActionInterface} from "./rewrite-content.action.interface";

@Injectable()
export class RewriteContentAction implements RewriteContentActionInterface{
    constructor(private config : RewriteContentActionConfig) {
    }
    async rewrite(links : LinkModel[]) : Promise<RewriteContentResponseNewModel> {
        const request : RewriteContentRequestModel = {
            links : links.map(chn => {
                return {
                    link: chn.link,
                }
            }),
            limit : 3
        }
        const response = await axios.post<RewriteContentResponseNewModel>(this.config.get().link, request)
        // response { channelLink: 'https://habr_media', status: 'ERROR' }, если устствутет свойство, есть свойство надо подумать
        // response - в случае ошибки, если не получилось запрос сделать сделать оповещение юзера
        return response.data
    }
}
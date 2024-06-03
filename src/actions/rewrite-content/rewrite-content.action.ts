import {LinkModel} from "../../model/link.model";
import axios from "axios";
import {RewriteContentResponseNewModel} from "../../model/response/rewrite-content.response.model";
import {RewriteContentActionConfig} from "./rewrite-content.action.config";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RewriteContentAction {
    constructor(private config : RewriteContentActionConfig) {
    }
    async rewrite(links : LinkModel[]) : Promise<RewriteContentResponseNewModel> {
        const request = links.map(chn => {
            return {
                link: chn.link,
                limit : 3
            }
        })
        console.log(this.config)
        const response = await axios.post<RewriteContentResponseNewModel>(this.config.get().link, request)
        // response { channelLink: 'https://habr_media', status: 'ERROR' }, если устствутет свойство, есть свойство надо подумать
        // response - в случае ошибки, если не получилось запрос сделать сделать оповещение юзера
        return response.data
    }
}
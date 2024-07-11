import {ContentAgencyClientInterface} from "./content-agency.client.interface";
import {RewriteContentResponseModel} from "./model/response/rewrite-content.response.model";
import {CheckChannelsRequestModel} from "./model/request/check-channels.request.model";
import {RewriteContentRequestModel} from "./model/request/rewrite-content.request.model";
import {Injectable} from "@nestjs/common";
import axios from "axios";


@Injectable()
export class ContentAgencyClient implements ContentAgencyClientInterface {


    //БОЮСЬ, ЧТО ТУТ МОЖЕТ ВОЗНИКНУТЬ ОШИБКА, при ответе
    //ГЛОБАЛНЬ ВНЕДРИТЬ КОНФИГ СЕРВИС

    async checkChannels(request: CheckChannelsRequestModel): Promise<CheckChannelsResponse> {
        const response = await axios.post<CheckChannelsResponse>(request.url.link, request.body)
        return response.data
    }
    async rewriteContent(request: RewriteContentRequestModel): Promise<RewriteContentResponseModel> {

        const response = await axios.post<RewriteContentResponseModel>(request.url.link, request.body)

        return response.data
    }
}
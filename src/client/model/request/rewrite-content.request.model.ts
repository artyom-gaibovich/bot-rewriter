import {LinkModel} from "../../../model/link/link.model";

export interface RewriteContentRequestModel {
    url : LinkModel,
    body : {
        links : LinkModel[]
        limit? : number,
    }

}
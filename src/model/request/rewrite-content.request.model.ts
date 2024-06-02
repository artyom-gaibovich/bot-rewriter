import {LinkModel} from "../link.model";

export interface RewriteContentRequestModel {
    links : LinkModel[]
    limit? : number,
}
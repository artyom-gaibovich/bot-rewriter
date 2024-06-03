import {LinkModel} from "../link/link.model";

export interface RewriteContentRequestModel {
    links : LinkModel[]
    limit? : number,
}
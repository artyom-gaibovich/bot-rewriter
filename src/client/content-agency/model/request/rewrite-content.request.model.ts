import {LinkInterface} from "../../../../model/link/link.interface";

export interface RewriteContentRequestModel {
    url : LinkInterface,
    body : {
        links : LinkInterface[]
        limit? : number,
    }

}
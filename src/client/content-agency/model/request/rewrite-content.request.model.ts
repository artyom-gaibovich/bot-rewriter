import {LinkInterface} from "../../../../model/link/link.interface";
import {PromptInterface} from "../../../../model/prompt.interface";

export interface RewriteContentRequestModel {
    url : LinkInterface,
    body : {
        prompt : PromptInterface
        links : LinkInterface[]
        limit? : number,
    }

}
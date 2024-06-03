import {LinkModel} from "../../model/link/link.model";
import {RewriteContentResponseNewModel} from "../../model/response/rewrite-content.response.model";

export interface RewriteContentActionInterface {
    rewrite(links : LinkModel[]) : Promise<RewriteContentResponseNewModel>
}
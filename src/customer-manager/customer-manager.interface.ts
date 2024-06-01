import {UserModel} from "../model/user.model";
import {RewriteContentResponseModel} from "../model/response/rewrite-content.response.model";

export interface CustomerManagerInterface {
    rewriteContent(user : UserModel) : Promise<RewriteContentResponseModel>
}
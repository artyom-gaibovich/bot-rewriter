import {UserModel} from "../../../model/user.model";
import {ContentModel} from "../../../model/content.model";

export interface SendContentToUserActionInterface {
    sendMessage(content : ContentModel, user : UserModel) : void
}
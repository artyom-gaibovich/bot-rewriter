import {SendContentToUserActionInterface} from "./send-content-to-user.action.interface";
import {UserModel} from "../../../model/user.model";
import {ContentModel} from "../../../model/content.model";

export class SendContentToUserAction implements SendContentToUserActionInterface{


    sendMessage(content: ContentModel, user: UserModel) : void {

    }
}
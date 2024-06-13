import {LinkInterface} from "../../../../model/link/link.interface";
import {UserInterface} from "../../../../model/user.interface";

export interface DeleteChannelToRewriteRequestInterface {
    url : LinkInterface
    body : UserInterface
}
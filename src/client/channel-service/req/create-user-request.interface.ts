import {UserChannelInterface} from "../../../model/channel.interface";
import {LinkInterface} from "../../../model/link/link.interface";
import {UserInterface} from "../../../model/user.interface";

export interface CreateUserRequestInterface {
    url : LinkInterface
    body : UserInterface
}
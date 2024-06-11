import {UserChannelInterface} from "../../../../model/channel.interface";
import {LinkInterface} from "../../../../model/link/link.interface";

export interface CreateUserRequestInterface {
    url : LinkInterface
    body : UserChannelInterface
}
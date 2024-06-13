import {UserChannelInterface} from "../../../../model/channel.interface";
import {LinkInterface} from "../../../../model/link/link.interface";
import {UserManagerInterface} from "../../../../manager/user/user.manager.interface";
import {UserInterface} from "../../../../model/user.interface";

export interface CreateUserResponseInterface {
    body : UserInterface | false
}
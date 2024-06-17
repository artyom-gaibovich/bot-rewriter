import {LinkInterface} from "../../../model/link/link.interface";
import {UserInterface} from "../../../model/user.interface";

export interface DeleteUserRequestInterface {
    url : LinkInterface
    body : UserInterface
}
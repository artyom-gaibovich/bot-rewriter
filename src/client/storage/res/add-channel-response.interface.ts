import {LinkInterface} from "../../../model/link/link.interface";
import {UserInterface} from "../../../model/user.interface";

//ПОДУМАТЬ ПРО ОБЯЗАТЕЛЬНОСТЬ ОПРЕДЕЛЕННЫХ СВОЙСТВ У UserInterface В ЭТОМ КЕЙСЕ
export interface AddChannelResponseInterface {
    body :  UserInterface | false
}
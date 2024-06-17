import {UserInterface} from "../../model/user.interface";

export interface UserRepositoryInterface {
    get(telegramId : number) : Promise<UserInterface>
}
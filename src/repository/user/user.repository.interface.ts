import {UserInterface} from "../../model/user.interface";

export interface UserRepositoryInterface {
    getUser(telegramId : number) : Promise<UserInterface>
}
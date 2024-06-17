import {UserRepositoryInterface} from "./user.repository.interface";
import {UserInterface} from "../../model/user.interface";
import {Inject, Injectable} from "@nestjs/common";
import {StorageClientInterface} from "../../client/storage/storage.client.interface";
import {LinkInterface} from "../../model/link/link.interface";
import {User} from "puregram";
import * as url from "url";
import {STORAGE_CLIENT} from "../../constants/DI.constants";
import {GET_USER_URL} from "../../constants/enviroment.constants";


@Injectable()
export class UserRepository implements UserRepositoryInterface {
    constructor(
        @Inject(GET_USER_URL) private link : LinkInterface,
        @Inject(STORAGE_CLIENT) private client : StorageClientInterface
    ) {
    }
    async get(telegramId: number): Promise<UserInterface> {
        const data = (await this.client.getUser({
            url : this.link,
            body : {
                user : {
                    id : telegramId
                }
            }

        }))
        return (data.body as UserInterface)
    }
}
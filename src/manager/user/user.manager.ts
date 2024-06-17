import {UserManagerInterface} from "./user.manager.interface";
import {UserInterface} from "../../model/user.interface";
import {Inject, Injectable} from "@nestjs/common";
import {UserManagerLinkConfig} from "./user.manager.link.config";
import {StorageClientInterface} from "../../client/storage/storage.client.interface";
import {STORAGE_CLIENT, USER_MANAGER_LINK_CONFIG} from "../../constants/DI.constants";

@Injectable()
export class UserManager implements UserManagerInterface {

    constructor(
        @Inject(USER_MANAGER_LINK_CONFIG) private config : UserManagerLinkConfig,
        @Inject(STORAGE_CLIENT) private client : StorageClientInterface,
    ) {

    }
    async createUser(user : UserInterface): Promise<UserInterface> {
        return (await this.client.createUser({
            url : this.config.createUser,
            body : user
        })).body as UserInterface
    }
    async deleteUser(user : UserInterface): Promise<UserInterface> {
        return (await this.client.deleteUser({
            url : this.config.createUser,
            body : user
        })).body as UserInterface
    }
}
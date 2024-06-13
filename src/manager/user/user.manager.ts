import {UserManagerInterface} from "./user.manager.interface";
import {UserInterface} from "../../model/user.interface";
import {Inject, Injectable} from "@nestjs/common";
import {UserManagerLinkConfig} from "./user.manager.link.config";
import {ChannelServiceClientInterface} from "../../client/channel-service/channel-service.client.interface";

@Injectable()
export class UserManager implements UserManagerInterface {

    constructor(
        @Inject('USER_MANAGER_LINK_CONFIG') private linkConfig : UserManagerLinkConfig,
        @Inject('CHANNEL_SERVICE_CLIENT') private client : ChannelServiceClientInterface,
    ) {

    }
    async createUser(user : UserInterface): Promise<UserInterface> {
        return (await this.client.createUser({
            url : this.linkConfig.createUser,
            body : user
        })).body as UserInterface
    }
    async deleteUser(user : UserInterface): Promise<UserInterface> {
        return (await this.client.deleteUser({
            url : this.linkConfig.createUser,
            body : user
        })).body as UserInterface
    }
}
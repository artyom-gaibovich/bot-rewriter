import {UserRepositoryInterface} from "./user.repository.interface";
import {UserInterface} from "../../model/user.interface";
import {Inject, Injectable} from "@nestjs/common";
import {ChannelServiceClientInterface} from "../../client/channel-service/channel-service.client.interface";
import {LinkInterface} from "../../model/link/link.interface";
import {User} from "puregram";
import * as url from "url";


@Injectable()
export class UserRepository implements UserRepositoryInterface {
    constructor(
        @Inject('GET_USER_URL') private link : LinkInterface,
        @Inject('CHANNEL_SERVICE_CLIENT') private channelService : ChannelServiceClientInterface
    ) {
    }
    async getUser(telegramId: number): Promise<UserInterface> {
        const data = (await this.channelService.getUser({
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
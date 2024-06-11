import {UserRepositoryInterface} from "./user.repository.interface";
import {UserInterface} from "../../model/user.interface";
import {Inject, Injectable} from "@nestjs/common";
import {ChannelServiceClientInterface} from "../../client/channel-service/channel-service.client.interface";
import {LinkInterface} from "../../model/link/link.interface";


@Injectable()
export class UserRepository implements UserRepositoryInterface {
    constructor(
        @Inject('GET_USER_URL') private link : LinkInterface,
        @Inject('CHANNEL_SERVICE_CLIENT') private channelService : ChannelServiceClientInterface
    ) {
    }
    async getUser(telegramId: number): Promise<UserInterface> {
        return (await this.channelService.getUser({
            url : this.link,
            body : {
                user : {
                    id : telegramId
                }
            }
        })).body
    }
}
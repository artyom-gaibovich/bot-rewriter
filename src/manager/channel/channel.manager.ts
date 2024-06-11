import {ChannelManagerInterface} from "./channel.manager.interface";
import {Inject, Injectable} from "@nestjs/common";
import {UserManagerLinkConfig} from "../user/user.manager.link.config";
import {UserInterface} from "../../model/user.interface";
import {ChannelManagerLinkConfig} from "./channel.manager.link.config";
import {ChannelServiceClientInterface} from "../../client/channel-service/channel-service.client.interface";

@Injectable()
export class ChannelManager implements ChannelManagerInterface {
    constructor(
        @Inject('CHANNEL_MANAGER_LINK_CONFIG') private linkConfig : ChannelManagerLinkConfig,
        @Inject('CHANNEL_SERVICE_CLIENT') private client : ChannelServiceClientInterface,
) {
    }

    async addChannel(user : UserInterface): Promise<UserInterface> {
        return (await this.client.addChannel({
            url : this.linkConfig.addChannel,
            body : user
        })).body
    }

    async deleteChannel(user : UserInterface): Promise<UserInterface> {
        return (await this.client.deleteChannel({
            url : this.linkConfig.deleteChannel,
            body : user
        })).body
    }

    async deleteChannelToRewrite(user : UserInterface): Promise<UserInterface> {
        return (await this.client.deleteChannelToRewrite({
            url : this.linkConfig.deleteChannelToRewrite,
            body : user
        })).body
    }
}
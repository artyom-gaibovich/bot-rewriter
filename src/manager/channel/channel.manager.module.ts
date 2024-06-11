import {Module} from "@nestjs/common";
import {UserManagerLinkConfig} from "../user/user.manager.link.config";
import {ChannelServiceClient} from "../../client/channel-service/channer-service.client";
import {ChannelServiceClientInterface} from "../../client/channel-service/channel-service.client.interface";
import {UserManager} from "../user/user.manager";
import {ChannelManagerLinkConfig} from "./channel.manager.link.config";

@Module({
    providers : [
        {
            provide : 'CHANNEL_MANAGER_LINK_CONFIG',
            useFactory : () => {
                return {
                    addChannel : {link : 'http://localhost:8080/api/v1/user/create'},
                    deleteChannel : {link : 'http://localhost:8080/api/v1/channel/delete'},
                    deleteChannelToRewrite : {link : 'http://localhost:8080/api/v1/channel/delete/channel-to-rewrite'}

                } as ChannelManagerLinkConfig
            },
        },
        {
            provide : 'CHANNEL_SERVICE_CLIENT',
            useFactory : () => {
                return new ChannelServiceClient()
            }
        },
        {
            provide: 'CHANNEL_MANAGER',
            useFactory : (linkConfig : UserManagerLinkConfig, channelService : ChannelServiceClientInterface ) => {
                return new UserManager(linkConfig, channelService)
            },
            inject : ['CHANNEL_MANAGER_LINK_CONFIG','CHANNEL_SERVICE_CLIENT']
        }

    ],

})
export class ChannelManagerModule {

}
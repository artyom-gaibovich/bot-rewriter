import {Module} from "@nestjs/common";
import {UserManagerLinkConfig} from "../user/user.manager.link.config";
import {ChannelServiceClient} from "../../client/channel-service/channer-service.client";
import {ChannelServiceClientInterface} from "../../client/channel-service/channel-service.client.interface";
import {UserManager} from "../user/user.manager";
import {ChannelManagerLinkConfig} from "./channel.manager.link.config";
import {ChannelManager} from "./channel.manager";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports : [ConfigModule],
    providers : [
        {
            provide : 'CHANNEL_MANAGER_LINK_CONFIG',
            useFactory : (config : ConfigService) => {
                return {
                    addChannel : {link : config.get('ADD_CHANNEL_URL')},
                    deleteChannel : {link : config.get('DELETE_CHANNEL_URL')},
                    deleteChannelToRewrite : {link : config.get('DELETE_CHANNEL_TO_REWRITE_URL')}

                } as ChannelManagerLinkConfig
            },
            inject : [ConfigService]
        },
        {
            provide : 'CHANNEL_SERVICE_CLIENT',
            useFactory : () => {
                return new ChannelServiceClient()
            }
        },
        {
            provide: 'CHANNEL_MANAGER',
            useFactory : (linkConfig : ChannelManagerLinkConfig, channelService : ChannelServiceClientInterface ) => {
                return new ChannelManager(linkConfig, channelService)
            },
            inject : ['CHANNEL_MANAGER_LINK_CONFIG','CHANNEL_SERVICE_CLIENT']
        }

    ],
    exports : ['CHANNEL_MANAGER']

})
export class ChannelManagerModule {

}
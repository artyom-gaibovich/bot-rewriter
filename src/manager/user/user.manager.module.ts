import {Module} from "@nestjs/common";
import {ChannelServiceClient} from "../../client/channel-service/channer-service.client";
import {ChannelServiceClientInterface} from "../../client/channel-service/channel-service.client.interface";
import {UserManagerLinkConfig} from "./user.manager.link.config";
import {UserManager} from "./user.manager";
import {ConfigModule, ConfigService} from "@nestjs/config";

//CREATE_USER_URL_DOCKER

@Module({
    imports : [ConfigModule],
    providers : [
        {
            provide : 'USER_MANAGER_LINK_CONFIG',
            useFactory : (config : ConfigService) => {
                return {
                    createUser : {link : config.get('CREATE_USER_URL')},
                    deleteUser : {link : config.get('CHECK_CHANNELS_URL')}
                } as UserManagerLinkConfig
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
            provide: 'USER_MANAGER',
            useFactory : (linkConfig : UserManagerLinkConfig, channelService : ChannelServiceClientInterface ) => {
                return new UserManager(linkConfig, channelService)
            },
            inject : ['USER_MANAGER_LINK_CONFIG','CHANNEL_SERVICE_CLIENT']
        }

    ],
    exports : ['USER_MANAGER']

})
export class UserManagerModule {

}
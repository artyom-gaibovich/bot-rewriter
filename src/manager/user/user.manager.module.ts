import {Module} from "@nestjs/common";
import {ChannelServiceClient} from "../../client/channel-service/channer-service.client";
import {ChannelServiceClientInterface} from "../../client/channel-service/channel-service.client.interface";
import {UserManagerLinkConfig} from "./user.manager.link.config";
import {UserManager} from "./user.manager";

@Module({
    providers : [
        {
            provide : 'USER_MANAGER_LINK_CONFIG',
            useFactory : () => {
                return {
                    createUser : {link : 'http://localhost:8080/api/v1/user/create'},
                    deleteUser : {link : 'http://localhost:8080/api/v1/user/delete'}
                } as UserManagerLinkConfig
            },
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
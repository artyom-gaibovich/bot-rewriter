import {Module} from "@nestjs/common";
import {ChannelMockRepository} from "../channel/channel-mock.repository";
import {UserRepository} from "./user.repository";
import {LinkInterface} from "../../model/link/link.interface";
import {ChannelServiceClient} from "../../client/channel-service/channer-service.client";
import {ChannelServiceClientInterface} from "../../client/channel-service/channel-service.client.interface";

@Module({
    providers : [
        {
            provide : 'GET_USER_URL',
            useFactory: () => {
                return {link : 'http://localhost:8080/api/v1/user/get'} as LinkInterface
            }
        },
        {
            provide : 'CHANNEL_SERVICE_CLIENT',
            useFactory : () => {
                return  new ChannelServiceClient()
            }
        },
        {
            provide : 'USER_REPOSITORY',
            useFactory: (link : LinkInterface, client : ChannelServiceClientInterface) => {
                return new UserRepository(link, client)
            },
            inject : ['GET_USER_URL', 'CHANNEL_SERVICE_CLIENT']
        }
    ],
    exports : [`USER_REPOSITORY`]
})
export class UserRepositoryModule {

}
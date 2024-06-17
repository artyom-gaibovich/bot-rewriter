import {Module} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {LinkInterface} from "../../model/link/link.interface";
import {StorageClientInterface} from "../../client/storage/storage.client.interface";
import {StorageClientModule} from "../../client/storage/storage.client.module";
import {STORAGE_CLIENT, USER_REPOSITORY} from "../../constants/DI.constants";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserRepositoryLinkConfig} from "./user.repository.link.config";
import {GET_USER_URL} from "../../constants/enviroment.constants";

@Module({
    imports : [StorageClientModule, ConfigModule],
    providers : [
        {
            provide : GET_USER_URL,
            useFactory: (config : ConfigService) => {
                return {
                    get : {link : config.get(GET_USER_URL)}
                } as UserRepositoryLinkConfig
            },
            inject : [ConfigService]
        },
        {
            provide : USER_REPOSITORY,
            useFactory: (link : LinkInterface, client : StorageClientInterface) => {
                return new UserRepository(link, client)
            },
            inject : [GET_USER_URL, STORAGE_CLIENT]
        }
    ],
    exports : [USER_REPOSITORY]
})
export class UserRepositoryModule {

}
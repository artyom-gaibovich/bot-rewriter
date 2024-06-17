import {Module} from "@nestjs/common";
import {StorageClientInterface} from "../../client/storage/storage.client.interface";
import {UserManagerLinkConfig} from "./user.manager.link.config";
import {UserManager} from "./user.manager";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {
    CHECK_CHANNELS_URL,
    CREATE_USER_URL,
    STORAGE_CLIENT,
    USER_MANAGER,
    USER_MANAGER_LINK_CONFIG
} from "../../constants/DI.constants";
import {StorageClientModule} from "../../client/storage/storage.client.module";

//CREATE_USER_URL_DOCKER

@Module({
    imports : [ConfigModule, StorageClientModule],
    providers : [
        {
            provide : USER_MANAGER_LINK_CONFIG,
            useFactory : (config : ConfigService) => {
                return {
                    createUser : {link : config.get(CREATE_USER_URL)},
                    deleteUser : {link : config.get(CHECK_CHANNELS_URL)}
                } as UserManagerLinkConfig
            },
            inject : [ConfigService]
        },

        {
            provide: USER_MANAGER,
            useFactory : (linkConfig : UserManagerLinkConfig, client : StorageClientInterface ) => {
                return new UserManager(linkConfig, client)
            },
            inject : [USER_MANAGER_LINK_CONFIG,STORAGE_CLIENT]
        }

    ],
    exports : [USER_MANAGER]

})
export class UserManagerModule {

}
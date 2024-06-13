import {Module} from "@nestjs/common";
import {ChannelRepositoryModule} from "../../../repository/channel/channel.repository.module";
import {UserManagerModule} from "../../../manager/user/user.manager.module";
import {MainChannelScene} from "./main-channel-scene";
import {UserRepositoryModule} from "../../../repository/user/user.repository.module";

@Module({
    imports : [UserManagerModule, UserRepositoryModule],
    providers : [MainChannelScene]
})
export class MainChannelSceneModule {

}
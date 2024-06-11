import {Module} from "@nestjs/common";
import {ChannelRepositoryModule} from "../../../repository/channel/channel.repository.module";
import {UserManagerModule} from "../../../manager/user/user.manager.module";

@Module({
    imports : [UserManagerModule, ChannelRepositoryModule]
})
export class MainChannelSceneModule {

}
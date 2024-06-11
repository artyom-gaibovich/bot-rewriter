import {Module} from "@nestjs/common";
import {ChannelManagerModule} from "../../../manager/channel/channel.manager.module";

@Module({
    imports : [ChannelManagerModule]
})
export class DeleteUserChannelSceneModule {

}
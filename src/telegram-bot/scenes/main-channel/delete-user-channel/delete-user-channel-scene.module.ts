import {Module} from "@nestjs/common";
import {ChannelManagerModule} from "../../../manager/channel/channel.manager.module";
import {DeleteUserChannelScene} from "./delete-user-channel-scene";
import {ChannelManagerInterface} from "../../../manager/channel/channel.manager.interface";

@Module({
    imports : [ChannelManagerModule],
    providers : [DeleteUserChannelScene]

})
export class DeleteUserChannelSceneModule {

}
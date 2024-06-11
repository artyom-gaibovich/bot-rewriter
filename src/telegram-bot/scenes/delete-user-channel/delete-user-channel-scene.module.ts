import {Module} from "@nestjs/common";
import {ChannelManagerModule} from "../../../manager/channel/channel.manager.module";
import {DeleteUserChannelScene} from "./delete-user-channel-scene";
import {ChannelManagerInterface} from "../../../manager/channel/channel.manager.interface";

@Module({
    imports : [ChannelManagerModule],
    providers : [
        {
            provide : DeleteUserChannelScene,
            useFactory : (channelManager : ChannelManagerInterface) => {
                return new DeleteUserChannelScene(channelManager)
            },
        }
    ],
    exports: [DeleteUserChannelScene]

})
export class DeleteUserChannelSceneModule {

}
import {Module} from "@nestjs/common";
import {ChannelManagerModule} from "../../../manager/channel/channel.manager.module";
import {ChannelCheckerModule} from "../../../checker/channel.checker.module";
import {AddUserChannelScene} from "./add-user-channel-scene";

@Module({
    imports : [ChannelManagerModule, ChannelCheckerModule],
    providers : [AddUserChannelScene]
})
export class AddUserChannelModule {

}
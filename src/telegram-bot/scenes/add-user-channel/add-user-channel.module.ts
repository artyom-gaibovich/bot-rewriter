import {Module} from "@nestjs/common";
import {ChannelManagerModule} from "../../../manager/channel/channel.manager.module";
import {ChannelCheckerModule} from "../../../checker/channel.checker.module";
import {AddUserChannelScene} from "./add-user-channel-scene";
import {LinkValidatorModule} from "../../../validator/link.validator.module";

@Module({
    imports : [LinkValidatorModule, ChannelManagerModule, ChannelCheckerModule],
    providers : [AddUserChannelScene]
})
export class AddUserChannelModule {

}
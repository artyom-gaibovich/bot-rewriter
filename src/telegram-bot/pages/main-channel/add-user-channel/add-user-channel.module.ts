import {Module} from "@nestjs/common";
import {ChannelManagerModule} from "../../../../manager/channel/channel.manager.module";
import {ChannelCheckerModule} from "../../../../checker/channel.checker.module";
import {AddUserChannel} from "./add-user-channel";
import {LinkValidatorModule} from "../../../../validator/link.validator.module";

@Module({
    imports : [LinkValidatorModule, ChannelManagerModule, ChannelCheckerModule],
    providers : [AddUserChannel]
})
export class AddUserChannelModule {

}
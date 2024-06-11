import {Module} from "@nestjs/common";
import {ChannelManagerModule} from "../../../manager/channel/channel.manager.module";
import {ChannelCheckerModule} from "../../../checker/channel.checker.module";

@Module({
    imports : [ChannelManagerModule, ChannelCheckerModule],
    providers : [
    ]
})
export class EditChannelToRewriteModule {

}
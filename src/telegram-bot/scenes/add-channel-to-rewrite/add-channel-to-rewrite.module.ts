import {Module} from "@nestjs/common";
import {ChannelCheckerModule} from "../../../checker/channel.checker.module";
import {ChannelManagerModule} from "../../../manager/channel/channel.manager.module";

@Module({
    imports : [ChannelCheckerModule, ChannelManagerModule]
})
export class AddChannelToRewriteModule {

}
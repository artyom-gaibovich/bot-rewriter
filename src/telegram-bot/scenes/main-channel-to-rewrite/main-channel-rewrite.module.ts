import {Module} from "@nestjs/common";
import {ChannelManagerModule} from "../../../manager/channel/channel.manager.module";
import {ChannelCheckerModule} from "../../../checker/channel.checker.module";
import {MainChannelToRewriteScene} from "./main-channel-to-rewrite-scene";

@Module({
    imports : [ChannelManagerModule, ChannelCheckerModule],
    providers : [MainChannelToRewriteScene]
})
export class MainChannelRewriteModule {

}
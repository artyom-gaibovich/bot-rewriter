import {Module} from "@nestjs/common";
import {ChannelManagerModule} from "../../../manager/channel/channel.manager.module";
import {ChannelCheckerModule} from "../../../checker/channel.checker.module";
import {MainChannelToRewrite} from "./main-channel-to-rewrite";

@Module({
    imports : [ChannelManagerModule, ChannelCheckerModule],
    providers : [MainChannelToRewrite]
})
export class MainChannelRewriteModule {

}
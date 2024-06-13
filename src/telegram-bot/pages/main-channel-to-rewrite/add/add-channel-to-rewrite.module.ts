import {Module} from "@nestjs/common";
import {ChannelCheckerModule} from "../../../../checker/channel.checker.module";
import {ChannelManagerModule} from "../../../../manager/channel/channel.manager.module";
import {AddChannelToRewrite} from "./add-channel-to-rewrite";

@Module({
    imports : [ChannelCheckerModule, ChannelManagerModule],
    providers : [AddChannelToRewrite]
})
export class AddChannelToRewriteModule {

}
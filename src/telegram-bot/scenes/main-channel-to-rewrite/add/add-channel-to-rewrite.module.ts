import {Module} from "@nestjs/common";
import {ChannelCheckerModule} from "../../../../checker/channel.checker.module";
import {ChannelManagerModule} from "../../../../manager/channel/channel.manager.module";
import {AddChannelToRewriteScene} from "./add-channel-to-rewrite-scene";

@Module({
    imports : [ChannelCheckerModule, ChannelManagerModule],
    providers : [AddChannelToRewriteScene]
})
export class AddChannelToRewriteModule {

}
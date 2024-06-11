import {Module} from "@nestjs/common";
import {ChannelManagerModule} from "../../../manager/channel/channel.manager.module";
import {ChannelCheckerModule} from "../../../checker/channel.checker.module";
import {EditChannelToRewriteScene} from "./edit-channel-to-rewrite-scene";

@Module({
    imports : [ChannelManagerModule, ChannelCheckerModule],
    providers : [EditChannelToRewriteScene]
})
export class EditChannelToRewriteModule {

}
import {Module} from "@nestjs/common";
import {RewriteContentAction} from "../../actions/rewrite-content/rewrite-content.action";
import {GetChannelsAction} from "../../actions/get-channels/get-channels.action";
import {RewriteContentActionModule} from "../../actions/rewrite-content/rewrite-content.action.module";
import {GetChannelsActionModule} from "../../actions/get-channels/get-channels.action.module";
import {RewriteContentHandler} from "./rewrite-content.handler";
import {
    SendToCheckChannelsActionConfig
} from "../../actions/send-to-check-channels/send-to-check-channels.action.config";
import {RewriteContentActionConfig} from "../../actions/rewrite-content/rewrite-content.action.config";

@Module({
    imports: [RewriteContentActionModule, GetChannelsActionModule],
    providers : [
        RewriteContentHandler
    ]
})
export class RewriteContentHandlerModule {}
import {Module} from "@nestjs/common";
import {AddChannelsActionModule} from "./actions/add-channels/add-channels.action.module";
import {RewriteContentActionModule} from "./actions/rewrite-content/rewrite-content.action.module";

@Module({
    imports : [AddChannelsActionModule, RewriteContentActionModule]
})
export class CustomerManagerModule {}
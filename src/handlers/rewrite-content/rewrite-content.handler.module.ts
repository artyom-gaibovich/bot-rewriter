import {Module} from "@nestjs/common";
import {RewriteContentActionModule} from "../../actions/rewrite-content/rewrite-content.action.module";
import {GetChannelsActionModule} from "../../actions/get-channels/get-channels.action.module";
import {RewriteContentHandler} from "./rewrite-content.handler";
import {ChannelRepository} from "../../repository/channel.repository";
import {ChannelRepositoryModule} from "../../repository/channel.repository.module";
import {ContentManagerModule} from "../../manager/content.manager.module";
import {ContentManager} from "../../manager/content.manager";

@Module({
    imports: [ChannelRepositoryModule, ContentManagerModule],
    providers : [ChannelRepository, ContentManager, RewriteContentHandler]
})
export class RewriteContentHandlerModule {}
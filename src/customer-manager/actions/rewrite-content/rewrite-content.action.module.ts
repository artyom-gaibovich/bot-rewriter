import {Module} from "@nestjs/common";
import {ChannelMockRepository} from "../../../repository/channel/channel-mock.repository";
import {ContentRewriter} from "../../../rewriter/content.rewriter";
import {RewriteContentAction} from "./rewrite-content.action";
import {ContentRewriterModule} from "../../../rewriter/content.rewriter.module";
import {ChannelRepositoryModule} from "../../../repository/channel/channel.repository.module";

@Module({
    imports: [ContentRewriterModule, ChannelRepositoryModule],
    providers : [RewriteContentAction]
})
export class RewriteContentActionModule {}
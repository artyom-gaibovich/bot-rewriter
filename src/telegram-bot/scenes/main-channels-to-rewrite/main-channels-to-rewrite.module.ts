import {Module} from "@nestjs/common";
import {ContentRewriterModule} from "../../../rewriter/content.rewriter.module";

@Module({
    imports : [ContentRewriterModule]
})
export class MainChannelsToRewriteModule {

}
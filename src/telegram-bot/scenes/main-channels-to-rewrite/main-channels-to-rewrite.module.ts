import {Module} from "@nestjs/common";
import {ContentRewriterModule} from "../../../rewriter/content.rewriter.module";
import {MainChannelsToRewriteScene} from "./main-channels-to-rewrite-scene";
import {UserRepositoryModule} from "../../../repository/user/user.repository.module";

@Module({
    imports : [ContentRewriterModule, UserRepositoryModule],
    providers: [MainChannelsToRewriteScene]
})
export class MainChannelsToRewriteModule {

}
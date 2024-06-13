import {Module} from "@nestjs/common";
import {ContentAgencyClient} from "../client/content-agency/content-agency.client";
import {LinkInterface} from "../model/link/link.interface";
import {ContentRewriter} from "./content.rewriter";

@Module({
    providers: [
        {
            provide : 'CUSTOM_CONTENT_REWRITER',
            useFactory: () => {
                return new ContentRewriter({link : 'http://localhost:4000/channels/posts'}, new ContentAgencyClient())
            }
        },
    ],
    exports : [`CUSTOM_CONTENT_REWRITER`]
})
export class ContentRewriterModule {

}
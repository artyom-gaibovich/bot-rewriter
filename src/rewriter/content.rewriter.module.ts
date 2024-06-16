import {Module} from "@nestjs/common";
import {ContentAgencyClient} from "../client/content-agency/content-agency.client";
import {LinkInterface} from "../model/link/link.interface";
import {ContentRewriter} from "./content.rewriter";
import {ConfigModule, ConfigService} from "@nestjs/config";
//REWRITE_CONTENT_URL
//REWRITE_CONTENT_URL_DOCKER
@Module({
    imports : [ConfigModule],
    providers: [
        {
            provide : 'CUSTOM_CONTENT_REWRITER',
            useFactory: (config : ConfigService) => {
                return new ContentRewriter({link : config.get('REWRITE_CONTENT_URL')}, new ContentAgencyClient())
            },
            inject : [ConfigService]
        },
    ],
    exports : [`CUSTOM_CONTENT_REWRITER`]
})
export class ContentRewriterModule {

}
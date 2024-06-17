import {Module} from "@nestjs/common";
import {ContentAgencyClient} from "../client/content-agency/content-agency.client";
import {LinkInterface} from "../model/link/link.interface";
import {ContentRewriter} from "./content.rewriter";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {CONTENT_AGENCY_CLIENT, CONTENT_REWRITER} from "../constants/DI.constants";
import {CONTENT_REWRITER_LINK_CONFIG, REWRITE_CONTENT_URL} from "../constants/enviroment.constants";
import {ContentRewriterLinkConfig} from "./content.rewriter.link.config";
import {ContentAgencyClientModule} from "../client/content-agency/content-agency.client.module";
import {ContentAgencyClientInterface} from "../client/content-agency/content-agency.client.interface";
//REWRITE_CONTENT_URL
//REWRITE_CONTENT_URL_DOCKER
@Module({
    imports : [ConfigModule, ContentAgencyClientModule],
    providers: [
        {
          provide : CONTENT_REWRITER_LINK_CONFIG,
            useFactory : (config : ConfigService) => {
              return {
                  rewrite : {link  : config.get(REWRITE_CONTENT_URL)}
              }
            }
        },
        {
            provide : CONTENT_REWRITER,
            useFactory: (config : ContentRewriterLinkConfig, client : ContentAgencyClientInterface) => {
                return new ContentRewriter(config, client)
            },
            inject : [CONTENT_REWRITER_LINK_CONFIG, CONTENT_AGENCY_CLIENT]
        },
    ],
    exports : [CONTENT_REWRITER]
})
export class ContentRewriterModule {

}
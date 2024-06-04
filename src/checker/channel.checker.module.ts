import {Module} from "@nestjs/common";
import {LinkModel} from "../model/link/link.model";
import {ContentAgencyClient} from "../client/content-agency.client";
import {ContentRewriter} from "../rewriter/content.rewriter";
import {ChannelChecker} from "./channel.checker";

@Module({
    providers: [
        {
            provide : "CUSTOM_CHANNEL_CHECKER",
            useFactory: () => {
                return new ChannelChecker(
                    {link : 'http://localhost:4000/channels/check'},
                    new ContentAgencyClient()
                )
            }
        }
    ],
    exports: [`CUSTOM_CHANNEL_CHECKER`]
})
export class ChannelCheckerModule {

}
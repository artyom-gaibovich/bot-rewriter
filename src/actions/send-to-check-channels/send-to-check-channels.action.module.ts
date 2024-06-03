import {Module} from "@nestjs/common";
import {SendToCheckChannelsActionConfig} from "./send-to-check-channels.action.config";
import {SendToCheckChannelsAction} from "./send-to-check-channels.action";

@Module({
    providers: [
        {
            provide : SendToCheckChannelsActionConfig,
            useFactory: () => {
                return new SendToCheckChannelsActionConfig({link: 'http://localhost:4000/channels/check'})
            },
        },
        SendToCheckChannelsAction
    ],
    exports: [SendToCheckChannelsActionConfig, SendToCheckChannelsAction]
})
export class GetChannelsActionsModule {

}
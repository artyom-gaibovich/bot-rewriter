import {Module} from "@nestjs/common";
import {GetChannelsActionConfig} from "./get-channels.action.config";
import {GetChannelsAction} from "./get-channels.action";

@Module({
    providers: [
        {
            provide : GetChannelsActionConfig,
            useFactory: () => {
                return new GetChannelsActionConfig({link: 'https://some_link'})
            },
        },
        GetChannelsAction
    ],
    exports : [GetChannelsActionConfig, GetChannelsAction]
})
export class GetChannelsActionModule {

}
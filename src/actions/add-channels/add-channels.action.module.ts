import {Module} from "@nestjs/common";
import {SendToCheckChannelsConfig} from "../../config/send-to-check-channels/send-to-check-channels.config";
import {SendToCheckChannelsAction} from "../send-to-check-channels/send-to-check-channels.action";
import {AddChannelsAction} from "./add-channels.action";

@Module({
    providers: [
        {
            provide: SendToCheckChannelsConfig,
            useFactory: () => {
                return new SendToCheckChannelsConfig({link : 'http://localhost:4000/channels/check'});
            },
        },
        {
            provide: SendToCheckChannelsAction,
            useClass: SendToCheckChannelsAction, // Автоматически разрешает зависимость ConfigService
        },
        {
            provide: AddChannelsAction,
            useClass: AddChannelsAction, // Автоматически разрешает зависимость ActionService
        },
    ],
})
export class AddChannelsActionModule {

}
import {Module} from "@nestjs/common";
import {SendToCheckChannelsAction} from "../../actions/send-to-check-channels/send-to-check-channels.action";
import {AddChannelsHandler} from "./add-channels.handler";
import {GetChannelsActionsModule} from "../../actions/send-to-check-channels/send-to-check-channels.action.module";

//возможно нужно экспорт сделать
@Module({
    imports: [GetChannelsActionsModule],
    providers: [SendToCheckChannelsAction, AddChannelsHandler],
})
export class AddChannelsHandlerModule {

}
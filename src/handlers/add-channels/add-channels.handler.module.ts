import {Module} from "@nestjs/common";
import {SendToCheckChannelsAction} from "../../actions/send-to-check-channels/send-to-check-channels.action";
import {AddChannelsHandler} from "./add-channels.handler";
import {GetChannelsActionsModule} from "../../actions/send-to-check-channels/send-to-check-channels.action.module";
import {ChannelRepository} from "../../repository/channel.repository";
import {AddChannelsConvertRequestAction} from "../../actions/convert-request/add-channels-convert-request.action";

//возможно нужно экспорт сделать
@Module({
    imports: [GetChannelsActionsModule],
    providers: [SendToCheckChannelsAction, AddChannelsConvertRequestAction, ChannelRepository, AddChannelsHandler],
})
export class AddChannelsHandlerModule {

}
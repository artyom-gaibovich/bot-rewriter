import {Module} from "@nestjs/common";
import {SendToCheckChannelsAction} from "../../actions/send-to-check-channels/send-to-check-channels.action";
import {AddChannelsHandler} from "./add-channels.handler";
import {GetChannelsActionsModule} from "../../actions/send-to-check-channels/send-to-check-channels.action.module";
import {ChannelRepository} from "../../repository/channel/channel.repository";
import {AddChannelsConvertRequestAction} from "../../actions/convert-request/add-channels-convert-request.action";
import {ChannelRepositoryModule} from "../../repository/channel/channel.repository.module";

//возможно нужно экспорт сделать
@Module({
    imports: [ChannelRepositoryModule],
    providers: [AddChannelsHandler],
})
export class AddChannelsHandlerModule {

}
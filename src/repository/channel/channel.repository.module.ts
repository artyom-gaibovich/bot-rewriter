import {Module} from "@nestjs/common";
import {SendToCheckChannelsAction} from "../../actions/send-to-check-channels/send-to-check-channels.action";
import {AddChannelsConvertRequestAction} from "../../actions/convert-request/add-channels-convert-request.action";
import {GetChannelsAction} from "../../actions/get-channels/get-channels.action";
import {GetChannelsActionsModule} from "../../actions/send-to-check-channels/send-to-check-channels.action.module";
import {ChannelRepository} from "./channel.repository";

@Module({
    imports : [GetChannelsActionsModule],
    providers : [
        SendToCheckChannelsAction,
        AddChannelsConvertRequestAction,
        GetChannelsAction,
        ChannelRepository,
    ],
    exports : [SendToCheckChannelsAction,AddChannelsConvertRequestAction, GetChannelsAction, ChannelRepository]
})
export class ChannelRepositoryModule {

}
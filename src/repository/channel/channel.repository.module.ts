import {Module} from "@nestjs/common";
import {SendToCheckChannelsAction} from "../../actions/send-to-check-channels/send-to-check-channels.action";
import {AddChannelsConvertRequestAction} from "../../actions/convert-request/add-channels-convert-request.action";

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
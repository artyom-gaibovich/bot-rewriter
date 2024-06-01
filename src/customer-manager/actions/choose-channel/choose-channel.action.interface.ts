import {ChannelModel} from "../../../model/channel.model";

export interface ChooseChannelActionInterface {
    chooseChannel(channels : ChannelModel[]): Promise<ChannelModel>
}
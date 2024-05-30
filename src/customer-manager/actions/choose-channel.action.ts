import {ChooseChannelActionInterface} from "./choose-channel.action.interface";
import {ChannelModel} from "../../model/channel.model";

export class ChooseChannelAction implements ChooseChannelActionInterface{
    chooseChannel(channels: ChannelModel[]): Promise<ChannelModel> {
        //Происходит логика по выбору канала
        //Сейчас делаю заглушку
        this.chooseChannel()
    }
}
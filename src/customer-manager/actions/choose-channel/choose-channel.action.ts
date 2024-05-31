import {ChooseChannelActionInterface} from "./choose-channel.action.interface";
import {ChannelModel} from "../../../model/channel.model";

export class ChooseChannelAction implements ChooseChannelActionInterface{
    async chooseChannel(channels: ChannelModel[]): Promise<ChannelModel> {
        //Происходит логика по выбору канала
        //Сейчас делаю заглушку
        await new Promise(resolve => setTimeout(resolve, 1000))
        return {
            link : {
                link : 'https://t.me/tot_proger',
            },
            channelsToRewrite : [
                {
                    link : 'https://t.me/habr_media',
                },
                {
                    link : 'https://t.me/habr_media',
                }]
        }
    }
}
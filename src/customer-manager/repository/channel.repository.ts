import {ChannelRepositoryInterface} from "./channel.repository.interface";
import {ChannelModel} from "../../model/channel.model";

export class ChannelRepository implements ChannelRepositoryInterface {
    async findById(id: number): Promise<ChannelModel[]> {
        //делаю здесь заглушку
        return  await new Promise<ChannelModel[]>(resolve => () => {
            setTimeout(() => {
                resolve(['https://t.me/zakodirovanna_telega', 'https://t.me/tot_proger'])
            }, 5000)
        })
    }
}
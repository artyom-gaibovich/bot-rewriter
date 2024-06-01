import {ChannelRepositoryInterface} from "./channel.repository.interface";
import {ChannelModel} from "../../model/channel.model";

export class ChannelRepository implements ChannelRepositoryInterface {
    async findById(id: number): Promise<ChannelModel[]> {
        //делаю здесь заглушку
        return  await new Promise<ChannelModel[]>(resolve => () => {
            setTimeout(() => {
                resolve([
                    {link : {link : 'some_chan'}, channelsToRewrite : [
                            {link : 'https://t.me/zakodirovanna_telega'},
                            {link : 'https://t.me/zakodirovanna_telega'}
                        ]}
                ])
            }, 5000)
        })
    }
}
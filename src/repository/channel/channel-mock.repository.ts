import {ChannelRepositoryInterface} from "./channel.repository.interface";
import {UserChannels} from "./channel.model";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ChannelMockRepository implements ChannelRepositoryInterface {
    async findById(id : number): Promise<UserChannels> {
        const responseDataMock : UserChannels = {
            userChannels : [
                {
                    userChannel : {id : 1, link : 'https://ваш_телеграм_канал_1'},
                    channelsToRewrite : [{id : 90001, link : 'https://t.me/zakodirovanna_telega'}, {id : 90002, link : 'https://t.me/habr_media'}, {id : 90003, link : 'https://t.me/zakodirovanna_telega'}]
                },
                {
                    userChannel : {id : 2, link : 'https://ваш_телеграм_канал_2'},
                    channelsToRewrite : [{id : 80001,   link : 'https://t.me/tot_proger'}, {id : 80003, link : 'https://t.me/habr_media'}]
                }
            ]
        }
        return await new Promise<UserChannels>(resolve => {
            setTimeout(() => {
                resolve(responseDataMock)
            }, 1000)
        })
    }
}
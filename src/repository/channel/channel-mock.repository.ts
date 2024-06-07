import {ChannelRepositoryInterface} from "./channel.repository.interface";
import {UserChannels} from "./channel.model";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ChannelMockRepository implements ChannelRepositoryInterface {
    async findById(id : number): Promise<UserChannels> {
        const responseDataMock : UserChannels = {
            userChannels : [
                {
                    userChannel : {link : 'https://ваш_телеграм_канал_1'},
                    channelsToRewrite : [{link : 'https://t.me/zakodirovanna_telega'}, {link : 'https://t.me/habr_media'}, {link : 'https://t.me/zakodirovanna_telega'}]
                },
                {
                    userChannel : {link : 'https://ваш_телеграм_канал_2'},
                    channelsToRewrite : [{link : 'https://t.me/tot_proger'}, {link : 'https://t.me/habr_media'}]
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
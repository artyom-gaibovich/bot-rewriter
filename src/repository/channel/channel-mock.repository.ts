import {ChannelRepositoryInterface} from "./channel.repository.interface";
import {UserChannel, UserChannels} from "./channel.model";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ChannelMockRepository implements ChannelRepositoryInterface {
    async findById(id : number): Promise<UserChannels> {
        const responseDataMock : UserChannels = {
            userChannels : [
                {
                    userChannel : {id : 1, link : 'https://ваш_телеграм_канал_1'},
                    channelsToRewrite : [{id : 90001, link : 'https://t.me/artyom_gaibovich'}, {id : 90002, link : 'https://t.me/habr_media'}, {id : 90003, link : 'https://t.me/tot_proger'}]
                },
                {
                    userChannel : {id : 2, link : 'https://ваш_телеграм_канал_2'},
                    channelsToRewrite : [{id : 80001,   link : 'https://t.me/chinamazing'}, {id : 80003, link : 'https://t.me/aiai_aiai1'}]
                }
            ]
        }
        return await new Promise<UserChannels>(resolve => {
            setTimeout(() => {
                resolve(responseDataMock)
            }, 1000)
        })
    }

    async findOne(id : number): Promise<UserChannel> {
        let responseData = {
            userChannel : {id : 1, link : 'https://ваш_телеграм_канал_1'},
            channelsToRewrite : [{id : 90001, link : 'https://t.me/artyom_gaibovich'}, {id : 90002, link : 'https://t.me/habr_media'}, {id : 90003, link : 'https://t.me/tot_proger'}]
        }

        if (id === 2) {
            responseData = {
                userChannel: { id: 2, link: 'https://ваш_телеграм_канал_2' },
                channelsToRewrite: [
                    { id: 80001, link: 'https://t.me/chinamazing' },
                    { id: 80003, link: 'https://t.me/aiai_aiai1' }
                ]
            }
        }
        return await new Promise<UserChannel>(resolve => {
            setTimeout(() => {
                resolve(responseData)
            }, 1000)
        })
    }
}
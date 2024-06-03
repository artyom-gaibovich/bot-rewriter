import {GetChannelsActionInterface} from "./get-channels.action.interface";
import {UserModel} from "../../model/user.model";
import {GetUserChannelsResponseModel} from "../../model/response/get-user-channels.response.model";
import {Injectable} from "@nestjs/common";
import {GetChannelsActionConfig} from "./get-channels.action.config";

@Injectable()
export class GetChannelsAction implements GetChannelsActionInterface {
    constructor(private readonly config : GetChannelsActionConfig) {
    }
    async get(user : UserModel) : Promise<GetUserChannelsResponseModel> {
        const responseDataMock : GetUserChannelsResponseModel = {
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
        return await new Promise<GetUserChannelsResponseModel>(resolve => {
            setTimeout(() => {
                resolve(responseDataMock)
            }, 1000)
        })
    }
}
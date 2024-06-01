import {CustomerManagerInterface} from "./customer-manager.interface";
import {UserModel} from "../model/user.model";
import {RewriteContentResponseModel} from "../model/response/rewrite-content.response.model";
import {DI} from "../DI";
import {ChannelRepositoryInterface} from "./repository/channel.repository.interface";
import {ChooseChannelActionInterface} from "./actions/choose-channel/choose-channel.action.interface";
import {RewriteContentActionInterface} from "./actions/rewrite-content/rewrite-content.action.interface";
import {Inject, Injectable} from "@nestjs/common";

@Injectable()
export class CustomerManager implements CustomerManagerInterface{
    constructor(
        @Inject(DI.ChannelRepository) private channelRepository : ChannelRepositoryInterface,
        @Inject(DI.ChooseChannelAction) private chooseChannelAction : ChooseChannelActionInterface,
        @Inject(DI.RewriteContentAction) private rewriteContentAction : RewriteContentActionInterface,
    ) {
    }
    async rewriteContent(user: UserModel): Promise<RewriteContentResponseModel> {
        //0) Спросить у папы, что нужен ли LinkModel и если нужен, то покажи пример использования
        //1) Получить список каналов юзера
        const channels = await this.channelRepository.findById(user.userId)
        //2) Передается список каналов, затем пользователь выбирает 1 канал
        const channel = await this.chooseChannelAction.chooseChannel(channels)
        //3) Переписываю контент
        const rewriteText = await this.rewriteContentAction.rewriteContent(channel)
        return {} as RewriteContentResponseModel
    }
}
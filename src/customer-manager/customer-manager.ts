import {injectable, inject} from "inversify";
import {CustomerManagerInterface} from "./customer-manager.interface";
import {UserModel} from "../model/user.model";
import {RewriteContentResponseModel} from "../model/response/rewrite-content.response.model";
import {Transaction} from "sequelize";
import TYPES = Transaction.TYPES;
import {DI} from "../DI";
import {ChannelRepositoryInterface} from "./repository/channel.repository.interface";

@injectable()
export class CustomerManager implements CustomerManagerInterface{
    constructor(@inject(DI.ChannelRepository) private channelRepository : ChannelRepositoryInterface) {
    }
    async rewriteContent(user: UserModel): Promise<RewriteContentResponseModel> {
        //1) Получить список каналов юзера
        const channels = this.channelRepository.findById(user.userId)
        //2) Передается список каналов, затем пользователь выбирает 1 канал

        //3) Переписываю контент
        return {
            text : '1000'
        }
    }
}
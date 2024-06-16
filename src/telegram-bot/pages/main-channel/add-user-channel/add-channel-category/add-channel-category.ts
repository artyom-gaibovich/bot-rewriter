import {
    ADD_CHANNEL_CATEGORY,
    ADD_USER_CHANNEL_PAGE,
    MAIN_CHANNEL_PAGE,
    MAIN_CHANNELS_TO_REWRITE_PAGE
} from "../../../pages.types";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {Inject} from "@nestjs/common";
import {LinkValidatorInterface} from "../../../../../validator/link.validator.interface";
import {ChannelManagerInterface} from "../../../../../manager/channel/channel.manager.interface";
import {AddUserChannelSceneContext} from "../add-user-channel";
import {CategoryRepositoryInterface} from "../../../../../repository/category/category.repository.interface";
import {TelegramContextModel} from "../../../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {ChannelLinkInterface} from "../../../../../model/link/channel.link.interface";
import {UserChannelInterface} from "../../../../../model/channel.interface";


export interface AddChannelCategoryInterface extends Record<string, any> {
    categories : CategoryInterface[]
    limit : number
}

export type AddChannelCategoryContext = TelegramContextModel & StepContext<AddChannelCategoryInterface>



@Scene(ADD_CHANNEL_CATEGORY)
export class AddChannelCategory {
    constructor(
        @Inject('CATEGORY_REPOSITORY') private repository: CategoryRepositoryInterface,
    ) {
    }

    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext: AddChannelCategoryContext) {
        telegramContext.scene.state.categories = await this.repository.findAll()
        telegramContext.scene.state.limit = 0
    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext: AddChannelCategoryContext) {
        const categories = telegramContext.scene.state.categories

        //0,5,10,15,20,25,30,35,40
        const limit = telegramContext.scene.state.limit
        const channelsCount = telegramContext.scene.state.userChannels.length
        const categoriesKeyboard = categories.map(category => {
            return [{text : category.title}]
        })

        const backKeyboard = [
            [{text : 'Назад'}],
        ]
        const limitKeyboard = [
            [{text : 'Повысить лимит'}],
        ]
        let mainKeyboard = []

        if (channelsCount > 0 && channelsCount < limit) {
            mainKeyboard = [...categoriesKeyboard, ...categoriesKeyboard, ...backKeyboard]
        }
        if (channelsCount === 0) {
            mainKeyboard = [...categoriesKeyboard, ...backKeyboard]
        }

        await telegramContext.send('Выберите дальнейшее действие', {
            reply_markup : {
                resize_keyboard : true,
                remove_keyboard : true,
                keyboard : [...mainKeyboard]
            }
        })
    }

}
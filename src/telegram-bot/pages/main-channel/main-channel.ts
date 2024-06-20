import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {UserChannelInterface} from "../../../model/channel.interface";
import {Inject} from "@nestjs/common";
import {UserRepositoryInterface} from "../../../repository/user/user.repository.interface";
import {ChannelLinkInterface} from "../../../model/link/channel.link.interface";
import {UserManagerInterface} from "../../../manager/user/user.manager.interface";
import {
    ADD_CHANNEL_CATEGORY,
    ADD_USER_CHANNEL_PAGE, IMPROVE_LIMITS,
    MAIN_CHANNEL_PAGE,
    MAIN_CHANNELS_TO_REWRITE_PAGE, SUPPORT
} from "../pages.types";
import {USER_MANAGER, USER_REPOSITORY} from "../../../constants/DI.constants";

export interface MainChannelSceneInterface extends Record<string, any> {
    userChannels : UserChannelInterface[]
}

export type MainChannelSceneContext = TelegramContextModel & StepContext<MainChannelSceneInterface>
@Scene(MAIN_CHANNEL_PAGE)
export class MainChannel {
    constructor(
        @Inject(USER_MANAGER) private userManager : UserManagerInterface,
        @Inject(USER_REPOSITORY) private repository : UserRepositoryInterface,
    ) {
    }

    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : MainChannelSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            let user = (await this.repository.get(telegramContext.from.id))
            if (!user) {
                user = await this.userManager.createUser({
                    user : {
                        id : telegramContext.from.id
                    }
                })
            }
            telegramContext.scene.state.userChannels = user.user.userChannels
        }
    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : MainChannelSceneContext) {


        //Проверяем, выбрал ли пользователь канал из ему предложенных
        if (telegramContext.scene.state.userChannels.map(chn=>(chn.userChannel as ChannelLinkInterface).link).includes(telegramContext.text)) {
            const foundUserChannel : UserChannelInterface = telegramContext.scene.state.userChannels.find(chn => (chn.userChannel as ChannelLinkInterface).link === telegramContext.text)
            return telegramContext.scene.enter(MAIN_CHANNELS_TO_REWRITE_PAGE, {state : {foundUserChannel}}) //УРАА, УДАЛОСЬ ПРОКИНУТЬ
        }
        //
        //ПЕРЕВОДИМ НА ДРУГУЮ СЦЕНУ, ИЛИ ШАГ, ГДЕ ДОБАВЛЯЕТ КАНАЛ, А ЗАТЕМ НАЗАД ИДЁМ
        const channels = telegramContext.scene.state.userChannels
        const channelsCount = telegramContext.scene.state.userChannels.length

        const channelsLimit = 3 //ЛИМИТ ЗАХАРЖКОЖЕНО!, С БИЛЛИНГ СЕРВИСА

        const channelKeyboard = channels.map(chn => {
            return [{text : (chn.userChannel as ChannelLinkInterface).link}]
        })

        const addChannelKeyboard = [
            [{text : 'Добавить категорию'}],
        ]
        const limitKeyboard = [
            [{text : 'Повысить лимит'}],
        ]
        const techSupport = [
            [{text : 'Техническая поддержка'}]
        ]
        let mainKeyboard = []
        if (channelsCount === channelsLimit) {
            mainKeyboard = [...limitKeyboard, ...channelKeyboard, ...techSupport]
        }
        if (channelsCount > 0 && channelsCount < channelsLimit) {
            mainKeyboard = [...addChannelKeyboard, ...channelKeyboard, ...techSupport]
        }
        if (channelsCount === 0) {
            mainKeyboard = [...addChannelKeyboard, ...techSupport]
        }
        switch (telegramContext.text) {
            case 'Добавить категорию':
                return await telegramContext.scene.enter(ADD_CHANNEL_CATEGORY)
            case 'Повысить лимит':
                return await telegramContext.scene.enter(IMPROVE_LIMITS, {
                    state : {
                        flag : 'MAIN_CHANNEL'
                    }
                })
            case 'Техническая поддержка':
                return await telegramContext.scene.enter(SUPPORT)
            default:
                return await telegramContext.send('Выберите дальнейшее действие', {
                    reply_markup : {
                        resize_keyboard : true,
                        remove_keyboard : true,
                        keyboard : [...mainKeyboard]
                    }
                })


        }


    }
}
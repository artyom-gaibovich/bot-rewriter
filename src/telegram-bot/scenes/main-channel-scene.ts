import {TelegramContextModel} from "../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {ADD_USER_CHANNEL_SCENE, MAIN_CHANNEL_SCENE, MAIN_CHANNELS_TO_REWROTE_SCENE} from "./scenes.types";
import {UserRepository} from "../../repository/user/user.repository";
import {UserChannelInterface} from "../../model/channel.interface";

export interface MainChannelSceneInterface extends Record<string, any> {
    userChannels : UserChannelInterface[]
}

export type MainChannelSceneContext = TelegramContextModel & StepContext<MainChannelSceneInterface>
@Scene(MAIN_CHANNEL_SCENE)
export class MainChannelScene {

    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : MainChannelSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            const repository = new UserRepository()
            telegramContext.scene.state.userChannels = (await repository.getUser(telegramContext.id)).user.userChannels
        }
    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : MainChannelSceneContext) {
        if (telegramContext.text === 'Добавить канал') {
            return telegramContext.scene.enter(ADD_USER_CHANNEL_SCENE)
        }
        //Проверяем, выбрал ли пользователь канал из ему предложенных
        if (telegramContext.scene.state.userChannels.map(chn=>chn.userChannel.link).includes(telegramContext.text)) {
            const foundUserChannel : UserChannelInterface = telegramContext.scene.state.userChannels.find(chn => chn.userChannel.link === telegramContext.text)
            return telegramContext.scene.enter(MAIN_CHANNELS_TO_REWROTE_SCENE, {state : {foundUserChannel}}) //УРАА, УДАЛОСЬ ПРОКИНУТЬ
        }
        //
        //ПЕРЕВОДИМ НА ДРУГУЮ СЦЕНУ, ИЛИ ШАГ, ГДЕ ДОБАВЛЯЕТ КАНАЛ, А ЗАТЕМ НАЗАД ИДЁМ
        const channels = telegramContext.scene.state.userChannels
        const channelsCount = telegramContext.scene.state.userChannels.length
        const channelsLimit = 3
        const channelKeyboard = channels.map(chn => {
            return [{text : chn.userChannel.link}]
        })
        const addChannelKeyboard = [
            [{text : 'Добавить канал'}],
        ]
        const backKeyboard = [
            [{text : 'Назад'}],
        ]
        const limitKeyboard = [
            [{text : 'Повысить лимит'}],
        ]
        let mainKeyboard = []
        if (channelsCount === channelsLimit) {
            mainKeyboard = [...limitKeyboard, ...channelKeyboard, ...backKeyboard]
        }
        if (channelsCount > 0 && channelsCount < channelsLimit) {
            mainKeyboard = [...addChannelKeyboard, ...channelKeyboard, ...backKeyboard]
        }
        if (channelsCount === 0) {
            mainKeyboard = [...addChannelKeyboard, ...backKeyboard]
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
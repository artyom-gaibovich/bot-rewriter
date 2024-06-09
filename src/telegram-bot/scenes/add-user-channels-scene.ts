import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {ADD_USER_CHANNEL_ACTION_SCENE, ADD_USER_CHANNEL_SCENE, MAIN_SCENE} from "./scenes.types";
import {TelegramContextModel} from "../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";


export interface AddUserChannelsSceneInterface extends Record<string, any> {
    activateCode : string
}

export type AddUserChannelsSceneContext = TelegramContextModel & StepContext<AddUserChannelsSceneInterface>

@Scene(ADD_USER_CHANNEL_SCENE)
export class AddUserChannelsScene {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : AddUserChannelsSceneContext) {

    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : AddUserChannelsSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send('Бот: Окей, скидывайте 1 или больше ваших каналов (которыми владеете вы).  ВАЖНО: сообщение должно быть в формате [ссылка] + категория канала (например спорт). Например: t.me/example спорт. Если каналов несколько, то скидывайте по принципу: 1 канал - одно сообщение. После отправки дожидайтесь сообщения от бота об успешном добавлении канала. Если вы что-то не поняли - напишите нашей поддержке - [ссылка] или посмотрите мануал [ссылка] *сообщение*', {
                reply_markup : {
                    keyboard : [
                        [{text : 'Начинаем!'}],
                        [{text : 'Назад'}],
                    ]
                }
            })
        }
        const text = telegramContext.text
        switch (text) {
            case 'Начинаем!':
                return await telegramContext.scene.enter(ADD_USER_CHANNEL_ACTION_SCENE);
            case 'Назад':
                return await telegramContext.scene.enter(MAIN_SCENE);
            default:
                return await telegramContext.scene.enter(MAIN_SCENE)
        }
    }
    @AddStep(1)
    async firstStep(@Ctx() telegramContext : AddUserChannelsSceneContext) {
        await telegramContext.scene.step.go(0)
    }
}
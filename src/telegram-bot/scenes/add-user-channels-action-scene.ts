import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {
    ADD_CHANNELS_TO_REWRITE_SCENE,
    ADD_USER_CHANNEL_ACTION_SCENE,
    ADD_USER_CHANNEL_SCENE, IMPROVE_LIMITS_SCENE,
    MAIN_SCENE
} from "./scenes.types";
import {AddUserChannelsSceneContext} from "./add-user-channels-scene";
import {TelegramContextModel} from "../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";


export interface AddUserChannelsActionSceneInterface extends Record<string, any> {
    limit : number
}

export type AddUserChannelsActionSceneContext = TelegramContextModel & StepContext<AddUserChannelsActionSceneInterface>


@Scene(ADD_USER_CHANNEL_ACTION_SCENE)
export class AddUserChannelsActionScene {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : AddUserChannelsActionSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            telegramContext.scene.state.limit = 0
        }
    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : AddUserChannelsActionSceneContext) {
        const text = telegramContext.text
        const limit = telegramContext.scene.state.limit
        if (text === 'Повысить лимит' && limit === 4) {
            return await telegramContext.scene.enter(IMPROVE_LIMITS_SCENE)
        }
        if (text === 'Готово' && limit !== 0) {
            return await telegramContext.scene.enter(ADD_CHANNELS_TO_REWRITE_SCENE)
        }
        if (text === 'Назад') {
            return await telegramContext.scene.enter(MAIN_SCENE)
        }
        if (limit === 0) {
            await telegramContext.send(`Жду ссылку, limit === ${limit}`, {
                reply_markup : {
                    remove_keyboard : true,
                    keyboard : [
                        [{text : 'Назад'}]
                    ]
                }
            })
        }
        if (limit >= 1 && limit <= 3) {
            await telegramContext.send(`Жду ссылку, limit === ${limit}`, {
                reply_markup : {
                    remove_keyboard : true,
                    keyboard : [
                        [{text : 'Назад'}],
                        [{text : 'Готово'}],
                    ]
                }
            })
        }
        if (limit === 4) {
            return await telegramContext.send(`Лимит превышен, limit === ${limit}`, {
                reply_markup : {
                    remove_keyboard : true,
                    keyboard : [
                        [{text : 'Назад'}],
                        [{text : 'Готово'}],
                        [{text : 'Повысить лимит'}],
                    ]
                }
            })
        }
        telegramContext.scene.state.limit+=1
    }
}
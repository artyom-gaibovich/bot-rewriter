import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {
    ACTIVATE_CODE_SCENE,
    ADD_USER_CHANNEL_SCENE,
    IMPROVE_LIMITS_SCENE,
    MAIN_SCENE,
    SUPPORT_SCENE
} from "../scenes.types";
import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";


export interface MainSceneInterface extends Record<string, any> {
}

export type MainSceneContext = TelegramContextModel & StepContext<MainSceneInterface>

@Scene(MAIN_SCENE)
export class MainScene {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : MainSceneContext) {

    }
    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : MainSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send('Супер!Можете пользоваться :)', {
                reply_markup : {
                    remove_keyboard : true,
                    keyboard : [
                        [{text : 'Поехали'}],
                        [{text : 'Повысить лимиты'}],
                        [{text : 'Техническая поддержка'}],
                        [{text : 'Назад'}],
                    ]
                }
            })
        }
        const text = telegramContext.text
        switch (text) {
            case 'Поехали':
                return await telegramContext.scene.enter(ADD_USER_CHANNEL_SCENE);
            case 'Повысить лимиты':
                return await telegramContext.scene.enter(IMPROVE_LIMITS_SCENE);
            case 'Техническая поддержка':
                return await telegramContext.scene.enter(SUPPORT_SCENE);
            case 'Назад':
                return await telegramContext.scene.enter(ACTIVATE_CODE_SCENE);
            default:
                return await telegramContext.scene.enter(MAIN_SCENE)
        }
    }
}
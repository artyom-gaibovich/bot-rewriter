import {IMPROVE_LIMITS_SCENE, MAIN_SCENE} from "./scenes.types";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {TelegramContextModel} from "../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";


export interface ImproveLimitsSceneInterface extends Record<string, any> {
}

export type ImproveLimitsSceneContext = TelegramContextModel & StepContext<ImproveLimitsSceneInterface>

@Scene(IMPROVE_LIMITS_SCENE)
export class ImproveLimitsScene {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : ImproveLimitsSceneContext) {

    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : ImproveLimitsSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            await telegramContext.send('Для повышения лимита перейдите по ссылке(ещё не работает)')
            await telegramContext.scene.enter(MAIN_SCENE)

        }
    }

}
import {IMPROVE_LIMITS_SCENE, MAIN_SCENE, SUPPORT_SCENE} from "./scenes.types";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {AddUserChannelsSceneContext} from "./add-user-channels-scene";
import {TelegramContextModel} from "../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";


export interface SupportSceneInterface extends Record<string, any> {
}

export type SupportSceneContext = TelegramContextModel & StepContext<SupportSceneInterface>

@Scene(SUPPORT_SCENE)
export class SupportScene {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : AddUserChannelsSceneContext) {

    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : SupportSceneInterface) {
        if (telegramContext.scene.step.firstTime) {
            await telegramContext.send(`Напишите в техподдержку @driive_xx, @ioliwok, @dreams_and_results`)
            await telegramContext.scene.enter(MAIN_SCENE)

        }
    }

}
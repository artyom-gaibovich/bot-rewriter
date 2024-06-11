import {MAIN_SCENE, SUPPORT_SCENE} from "../scenes.types";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";


export interface SupportSceneInterface extends Record<string, any> {
}

export type SupportSceneContext = TelegramContextModel & StepContext<SupportSceneInterface>

@Scene(SUPPORT_SCENE)
export class SupportScene {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : SupportSceneContext) {

    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : SupportSceneInterface) {
        if (telegramContext.scene.step.firstTime) {
            await telegramContext.send(`Напишите в техподдержку @driive_xx, @ioliwok, @dreams_and_results`)
            await telegramContext.scene.enter(MAIN_SCENE)

        }
    }

}
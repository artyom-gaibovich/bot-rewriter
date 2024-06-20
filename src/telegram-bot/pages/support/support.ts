import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {MAIN_CHANNEL_PAGE, SUPPORT} from "../pages.types";


export interface SupportSceneInterface extends Record<string, any> {
}

export type SupportSceneContext = TelegramContextModel & StepContext<SupportSceneInterface>

@Scene(SUPPORT)
export class Support {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : SupportSceneContext) {

    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : SupportSceneInterface) {
        if (telegramContext.scene.step.firstTime) {
            await telegramContext.send(`Напишите в техподдержку @driive_xx, @ioliwok, @dreams_and_results`)
        }
        if (telegramContext.text === 'Техническая поддержка') {
            await telegramContext.send(`Напишите в техподдержку @driive_xx, @ioliwok, @dreams_and_results`)
        }
        if (telegramContext.text === 'Вернуться обратно') {
            await telegramContext.scene.enter(MAIN_CHANNEL_PAGE)
        }
    }

}
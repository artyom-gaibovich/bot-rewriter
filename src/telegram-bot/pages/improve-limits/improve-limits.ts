import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {IMPROVE_LIMITS, MAIN_CHANNEL_PAGE} from "../pages.types";


export interface ImproveLimitsInterface extends Record<string, any> {
}

export type ImproveLimitsContext = TelegramContextModel & StepContext<ImproveLimitsInterface>

@Scene(IMPROVE_LIMITS)
export class ImproveLimits {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : ImproveLimitsContext) {

    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : ImproveLimitsContext) {

        if (telegramContext.text === 'Ссылка на лендинг') {
            return await telegramContext.send('Ссылка на лендинг https://vk.com/awoskaa')
        }
        if (telegramContext.text === 'Вернуться назад') {
            return await telegramContext.scene.enter(MAIN_CHANNEL_PAGE)
        }

    }

}
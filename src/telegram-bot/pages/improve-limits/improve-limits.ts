import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {IMPROVE_LIMITS, MAIN_CHANNEL_PAGE, MAIN_CHANNEL_TO_REWRITE_PAGE} from "../pages.types";


export interface ImproveLimitsInterface extends Record<string, any> {
    flag : 'MAIN_CHANNELS_TO_REWRITE' | 'MAIN_CHANNEL'
}

export type ImproveLimitsContext = TelegramContextModel & StepContext<ImproveLimitsInterface>

@Scene(IMPROVE_LIMITS)
export class ImproveLimits {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : ImproveLimitsContext) {

    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : ImproveLimitsContext) {
        if (telegramContext.scene.step.firstTime) {
            if (telegramContext.scene.step.firstTime) {
                const tariffPlane = 'Базовый' //УБРАТЬ ХАРДКОД
                return await telegramContext.send(`Ваш текущий тарифный план : ${tariffPlane}. Если хотите его повысить, перейдите по ссылке https://localhost:/api/subcribe`, {
                    reply_markup : {
                        resize_keyboard : true,
                        remove_keyboard : true,
                        keyboard : [{text : 'Вернуться назад'}]
                    }
                })
            }
        }
        if (telegramContext.text === 'Вернуться назад') {
            const flag = telegramContext.scene.state.flag
            return await telegramContext.scene.enter(flag === 'MAIN_CHANNEL' ? MAIN_CHANNEL_PAGE : MAIN_CHANNEL_TO_REWRITE_PAGE)
        }
        else {
            const tariffPlane = 'Базовый'
            return await telegramContext.send(`Ваш текущий тарифный план : ${tariffPlane}. Если хотите его повысить, перейдите по ссылке https://localhost:/api/subcribe`, {
                reply_markup : {
                    resize_keyboard : true,
                    remove_keyboard : true,
                    keyboard : [{text : 'Вернуться назад'}]
                }
            })
        }

    }

}
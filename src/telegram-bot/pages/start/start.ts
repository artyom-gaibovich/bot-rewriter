import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {ACTIVATE_CODE, ADD_CHANNELS_PROMO, IMPROVE_LIMITS, MAIN_CHANNEL_PAGE, START} from "../pages.types";

export interface StartInterface extends Record<string, any> {
    activateCode : string
}

export type StartContext = TelegramContextModel & StepContext<StartInterface>

@Scene(START)
export class Start {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : StartContext) {
        telegramContext.scene.state.activateCode = 'PASSWORD'
    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : StartContext) {
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send('Всё отлично, можете пользоваться!', {
                reply_markup : {
                    resize_keyboard : true,
                    remove_keyboard : true,
                    keyboard : [{text : 'Хорошо, поехали!'}, [{text : 'Повысить лимиты'}]]
                }
            })
        }
        if (telegramContext.text === 'Хорошо, поехали!') {
            return await telegramContext.scene.enter(MAIN_CHANNEL_PAGE)
        }
        if (telegramContext.text === 'Повысить лимиты') {
            return await telegramContext.scene.enter(IMPROVE_LIMITS)
        }
    }

}
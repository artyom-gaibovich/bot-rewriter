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
            return await telegramContext.send('😎 Код введён верно! Приступим к генерации контента? \n' +
                '\n' +
                'Добавляется свои основные каналы для которых будет генерироваться контент и дополнительные каналы с которых будет парситься материал для генерации. Если вы запутались и не понимаете что делать — напишите в поддержку или посмотрите наш видео-туториал', {
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
        else {
            return await telegramContext.send('Выберите дальнейшее действие', {
                reply_markup : {
                    resize_keyboard : true,
                    remove_keyboard : true,
                    keyboard : [{text : 'Хорошо, поехали!'}, [{text : 'Повысить лимиты'}]]
                }
            })
        }
    }

}
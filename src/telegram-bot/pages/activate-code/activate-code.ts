import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {ACTIVATE_CODE, ADD_CHANNELS_PROMO, MAIN_CHANNEL_PAGE, START, SUPPORT} from "../pages.types";


export interface ActivateCodeInterface extends Record<string, any> {
    activateCode : string
    isClicked : boolean
}

export type ActivateCodeScene = TelegramContextModel & StepContext<ActivateCodeInterface>

@Scene(ACTIVATE_CODE)
export class ActivateCode {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : ActivateCodeScene) {
        telegramContext.scene.state.activateCode = 'admin'
    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : ActivateCodeScene) {
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send('Вас приветствует приложение Neweral AI! С помощью нашего бота вы сможете автоматизировать создание контента для ваших каналов.  \n' +
                '\n' +
                'Для того, чтобы активировать программу, вам нужно ввести код активации, выданный вам после оплаты. Если что-то пошло не так — напишите в нашу техподдержку', {
                reply_markup : {
                    remove_keyboard : true
                }
            })
        }
        if (telegramContext.scene.state.activateCode === telegramContext.text) {
            return await telegramContext.scene.enter(ADD_CHANNELS_PROMO)
        }
        if (telegramContext.text === 'Техподдержка') {
            return await telegramContext.scene.enter(SUPPORT, {
                state : {
                    supportFlag : 'activateCode'
                }
            })
        }
        else {
            return await telegramContext.send('🥺 Упс, код введён неправильно. Убедитесь, что вы не допустили ошибок или напишите в техподдержку — мы поможем!\n' +
                '\n' +
                'Чтобы продолжить — попробуйте ввести код заново.', {
                reply_markup : {
                    resize_keyboard : true,
                    remove_keyboard : true,
                    keyboard : [[{text : 'Техподдержка'}]]
                }
            })
        }

    }

}
import {AddStep, Ctx, On, Scene, SceneEnter} from "nestjs-puregram";
import {ACTIVATE_CODE, MAIN_SCENE} from "./scenes.types";
import {TelegramContextModel} from "../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";




export interface ActivateCodeInterface extends Record<string, any> {
    activateCode : string
}

export type ActivateCodeContext = TelegramContextModel & StepContext<ActivateCodeInterface>
@Scene(ACTIVATE_CODE)
export class ActivateCode {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : ActivateCodeContext) {

    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : ActivateCodeContext) {
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send('Введите код для активации ')
        }
        telegramContext.scene.state.activateCode = telegramContext.text
        if (telegramContext.scene.state.activateCode === 'PASSWORD') {
            await telegramContext.send('Верный код')
            await telegramContext.scene.enter(MAIN_SCENE)
        }
        else {
            await telegramContext.send('Не верный код. Повторите попытку', {
                reply_markup : {
                    keyboard : [[{text : 'Ссылка на лендинг(ещё не работает)'}]]
                }
            })
        }

    }

}
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";


export interface ActivateCodeSceneInterface extends Record<string, any> {
    activateCode : string
}

export type ActivateCodeSceneContext = TelegramContextModel & StepContext<ActivateCodeSceneInterface>
@Scene('')
export class ActivateCodeScene {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : ActivateCodeSceneContext) {

    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : ActivateCodeSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send('Введите код для активации ')
        }
        telegramContext.scene.state.activateCode = telegramContext.text
        if (telegramContext.scene.state.activateCode === 'PASSWORD') {
            await telegramContext.send('Верный код')
            await telegramContext.scene.enter('MAIN_SCENE')
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
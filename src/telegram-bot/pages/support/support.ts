import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {ADD_CHANNELS_PROMO, MAIN_CHANNEL_PAGE, SUPPORT} from "../pages.types";


export interface SupportInterface extends Record<string, any> {
    supportFlag : 'addChannelPromo' | 'mainChannel'
}

export type SupportContext = TelegramContextModel & StepContext<SupportInterface>

@Scene(SUPPORT)
export class Support {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : SupportContext) {

    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : SupportContext) {
        if (telegramContext.scene.step.firstTime) {
                return await telegramContext.send('Напишите в техподдержку @driive_xx, @ioliwok, @dreams_and_results', {
                    reply_markup : {
                        resize_keyboard : true,
                        remove_keyboard : true,
                        keyboard : [[{text : '🟦 Вернуться обратно'}]]
                    }
                })
        }
        if (telegramContext.text === '🟦 Вернуться обратно') {
            const supportFlag = telegramContext.scene.state.supportFlag
            await telegramContext.scene.enter(supportFlag === 'addChannelPromo' ? ADD_CHANNELS_PROMO : MAIN_CHANNEL_PAGE)
        }
    }

}
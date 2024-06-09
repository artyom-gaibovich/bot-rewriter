import {TelegramContextModel} from "../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {EDIT_CHANNEL_TO_REWRITE_SCENE, MAIN_CHANNEL_SCENE, MAIN_CHANNELS_TO_REWROTE_SCENE} from "./scenes.types";
import {ChannelChecker} from "../../checker/channel.checker";
import {ContentAgencyClient} from "../../client/content-agency.client";
import {ChannelLinkInterface} from "../../model/link/channel.link.interface";

export interface EditChannelToRewriteSceneInterface extends Record<string, any> {
    isChannelAdded : boolean
    foundChannelToRewrite : ChannelLinkInterface
}

export type EditChannelToRewriteSceneContext = TelegramContextModel & StepContext<EditChannelToRewriteSceneInterface>


@Scene(EDIT_CHANNEL_TO_REWRITE_SCENE)
export class EditChannelToRewriteScene {

    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : EditChannelToRewriteSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            telegramContext.scene.state.isChannelAdded = false
        }
    }
    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : EditChannelToRewriteSceneContext) {
        if (telegramContext.text === 'Назад') {
            return await telegramContext.scene.enter(MAIN_CHANNELS_TO_REWROTE_SCENE)
        }
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send(`Ваш текущий канал ${telegramContext.scene.state.foundChannelToRewrite.link} для переписывания контента. Если вы отправите ссылку, то канал для переписывания изменится`, {
                reply_markup : {
                    resize_keyboard : true,
                    keyboard : [[{text : 'Назад'}]]
                }
            })
        }

        const checker = new ChannelChecker({link : 'http://localhost:4000/channels/check'}, new ContentAgencyClient())
        const isChannelAdded = (await checker.checkByLinks([
            {link : telegramContext.text}
        ])).checkedChannels[0].isChannelExists

        if (isChannelAdded) {
            await telegramContext.send('Канал был успешно добавлен!')
            return await telegramContext.scene.enter(MAIN_CHANNELS_TO_REWROTE_SCENE)
        }
        else {
            await telegramContext.send('Канал не был добавлен, отправьте корректную ссылку.', {
                reply_markup : {
                    resize_keyboard : true,
                    keyboard : [[{text : 'Назад'}]]
                }
            })
        }

    }
}
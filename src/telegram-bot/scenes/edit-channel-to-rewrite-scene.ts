import {TelegramContextModel} from "../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {EDIT_CHANNEL_TO_REWRITE_SCENE, MAIN_CHANNEL_SCENE, MAIN_CHANNELS_TO_REWROTE_SCENE} from "./scenes.types";
import {ChannelChecker} from "../../checker/channel.checker";
import {ContentAgencyClient} from "../../client/content-agency.client";
import {ChannelLinkInterface} from "../../model/link/channel.link.interface";
import {ChannelManager} from "../../manager/channel.manager";

export interface EditChannelToRewriteSceneInterface extends Record<string, any> {
    isChannelAdded : boolean
    foundUserChannel  : ChannelLinkInterface,
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
        const foundUserChannel = telegramContext.scene.state.foundUserChannel
        const foundChannelToRewrite = telegramContext.scene.state.foundChannelToRewrite
        if (telegramContext.text === 'Отменить') {
            return await telegramContext.scene.enter(MAIN_CHANNELS_TO_REWROTE_SCENE, {
                state : {foundUserChannel}
            })
        }
        if (telegramContext.text === 'Удалить подканал') {
            const channelManager = new ChannelManager()
            channelManager.delete(foundUserChannel.id)
            await telegramContext.send(`Канал ${foundChannelToRewrite.link} был успешно удалён`)
            return await telegramContext.scene.enter(MAIN_CHANNELS_TO_REWROTE_SCENE, {
                state : {foundUserChannel}
            })
        }
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send(`Ваш текущий канал для переписывания${foundChannelToRewrite.link}. Если хотите его изменить, отправьте новую ссылку.`, {
                reply_markup : {
                    resize_keyboard : true,
                    keyboard : [
                        [{text : 'Отменить'}],
                        [{text : 'Удалить подканал'}],
                    ]
                }
            })
        }

        const checker = new ChannelChecker({link : 'http://localhost:4000/channels/check'}, new ContentAgencyClient())
        const isChannelAdded = (await checker.checkByLinks([
            {link : telegramContext.text}
        ])).checkedChannels[0].isChannelExists


        if (isChannelAdded) {
            await telegramContext.send('Подканал был изменён!')
            return await telegramContext.scene.enter(MAIN_CHANNELS_TO_REWROTE_SCENE)
        }
        else {
            await telegramContext.send('Подканал не был изменен, либо отправили некорректную ссылку')
        }
    }
}
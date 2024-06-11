import {TelegramContextModel} from "../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {DELETE_USER_CHANNEL_SCENE, MAIN_CHANNEL_SCENE, MAIN_CHANNELS_TO_REWROTE_SCENE} from "./scenes.types";
import {ChannelChecker} from "../../checker/channel.checker";
import {ContentAgencyClient} from "../../client/content-agency.client";
import {LinkInterface} from "../../model/link/link.interface";
import {UserChannel} from "../../model/channel.model";
import {ChannelManager} from "../../manager/channel/channel.manager";

export interface DeleteUserChannelSceneInterface extends Record<string, any> {
    userChannelToDelete : UserChannel
}

export type DeleteUserChannelSceneContext = TelegramContextModel & StepContext<DeleteUserChannelSceneInterface>


@Scene(DELETE_USER_CHANNEL_SCENE)
export class DeleteUserChannelScene {

    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : DeleteUserChannelSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            telegramContext.scene.state.isChannelAdded = false
        }
    }
    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : DeleteUserChannelSceneContext) {
        const userChannelToDelete = telegramContext.scene.state.userChannelToDelete
        if (telegramContext.text === 'Отменить') {
            return await telegramContext.scene.enter(MAIN_CHANNELS_TO_REWROTE_SCENE, {
                state : {
                    foundUserChannel : userChannelToDelete
                }
            })
        }
        if (telegramContext.text === 'Удалить') {
            const channelManager = new ChannelManager()
            channelManager.delete(userChannelToDelete.userChannel.id)
            await telegramContext.send(`Канал ${userChannelToDelete.userChannel.link} был удалён.`)
            return telegramContext.scene.enter(MAIN_CHANNEL_SCENE)
        }
        await telegramContext.send(`Все подканалы у канала ${userChannelToDelete.userChannel.link} удалятся. Вы уверены, что хотите его удалить??`, {
            reply_markup : {
                keyboard: [
                    [{text : 'Отменить'}],
                    [{text : 'Удалить'}],
                ],
                resize_keyboard : true
            }
        })

    }
}
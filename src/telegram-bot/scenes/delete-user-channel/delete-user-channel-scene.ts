import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {DELETE_USER_CHANNEL_SCENE, MAIN_CHANNEL_SCENE, MAIN_CHANNELS_TO_REWROTE_SCENE} from "../scenes.types";
import {ChannelManager} from "../../../manager/channel/channel.manager";
import {UserChannelInterface} from "../../../model/channel.interface";
import {Inject} from "@nestjs/common";
import {ChannelManagerInterface} from "../../../manager/channel/channel.manager.interface";
import {ChannelCheckerInterface} from "../../../checker/channel.checker.interface";
import {ChannelLinkInterface} from "../../../model/link/channel.link.interface";

export interface DeleteUserChannelSceneInterface extends Record<string, any> {
    userChannelToDelete : UserChannelInterface
}

export type DeleteUserChannelSceneContext = TelegramContextModel & StepContext<DeleteUserChannelSceneInterface>


@Scene(DELETE_USER_CHANNEL_SCENE)
export class DeleteUserChannelScene {
    constructor(
        @Inject('CHANNEL_MANAGER') private channelManager : ChannelManagerInterface,
    ) {
    }



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
            await this.channelManager.deleteChannel({
                user : {
                    id : telegramContext.from.id,
                    userChannels : [userChannelToDelete]
                }
            })
            await telegramContext.send(`Канал ${(userChannelToDelete.userChannel as ChannelLinkInterface).link} был удалён.`)
            return telegramContext.scene.enter(MAIN_CHANNEL_SCENE)
        }
        await telegramContext.send(`Все подканалы у канала ${(userChannelToDelete.userChannel as ChannelLinkInterface).link} удалятся. Вы уверены, что хотите его удалить??`, {
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
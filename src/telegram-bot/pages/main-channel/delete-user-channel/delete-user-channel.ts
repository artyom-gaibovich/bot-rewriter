import {TelegramContextModel} from "../../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {UserChannelInterface} from "../../../../model/channel.interface";
import {Inject} from "@nestjs/common";
import {ChannelManagerInterface} from "../../../../manager/channel/channel.manager.interface";
import {ChannelLinkInterface} from "../../../../model/link/channel.link.interface";
import {DELETE_USER_CHANNEL_PAGE, MAIN_CHANNEL_PAGE, MAIN_CHANNELS_TO_REWRITE_PAGE} from "../../pages.types";

export interface DeleteUserChannelSceneInterface extends Record<string, any> {
    userChannelToDelete : UserChannelInterface
}

export type DeleteUserChannelSceneContext = TelegramContextModel & StepContext<DeleteUserChannelSceneInterface>


@Scene(DELETE_USER_CHANNEL_PAGE)
export class DeleteUserChannel {
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
            return await telegramContext.scene.enter(MAIN_CHANNELS_TO_REWRITE_PAGE, {
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
            return telegramContext.scene.enter(MAIN_CHANNEL_PAGE)
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
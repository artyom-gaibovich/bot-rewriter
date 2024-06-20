import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";

import {ChannelLinkInterface} from "../../../model/link/channel.link.interface";
import {Inject} from "@nestjs/common";
import {ChannelManagerInterface} from "../../../manager/channel/channel.manager.interface";
import {MAIN_CHANNEL_TO_REWRITE_PAGE, MAIN_CHANNELS_TO_REWRITE_PAGE} from "../pages.types";
import {CHANNEL_MANAGER} from "../../../constants/DI.constants";

export interface MainChannelToRewriteSceneInterface extends Record<string, any> {
    isChannelAdded : boolean
    foundUserChannel  : ChannelLinkInterface,
    foundChannelToRewrite : ChannelLinkInterface
}

export type MainChannelToRewriteSceneContext = TelegramContextModel & StepContext<MainChannelToRewriteSceneInterface>



@Scene(MAIN_CHANNEL_TO_REWRITE_PAGE)
export class MainChannelToRewrite {
    constructor(
        @Inject(CHANNEL_MANAGER) private channelManager : ChannelManagerInterface,
    ) {
    }

    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : MainChannelToRewriteSceneInterface) {
        if (telegramContext.scene.step.firstTime) {
        }
    }
    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : MainChannelToRewriteSceneInterface) {
        const foundChannelToRewrite = telegramContext.scene.state.foundChannelToRewrite
        const foundUserChannel = telegramContext.scene.state.foundUserChannel

        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send(`Ваш текущий канал для переписывания ${foundChannelToRewrite.link}. Если хотите его изменить, отправьте новую ссылку.`, {
                reply_markup : {
                    resize_keyboard : true,
                    keyboard : [
                        [{text : 'Обратно'}],
                        [{text : 'Удалить подканал'}],
                    ]
                }
            })
        }
        if (telegramContext.text === 'Обратно') {
            return await telegramContext.scene.enter(MAIN_CHANNELS_TO_REWRITE_PAGE, {
                state : {foundUserChannel}
            })
        }

        if (telegramContext.text === 'Удалить подканал') {
            const result = await this.channelManager.deleteChannel({
                user : {
                    id : telegramContext.from.id,
                    userChannels : [
                        {
                            userChannel : {},
                            channelsToRewrite : [
                                foundChannelToRewrite //ID у него должен быть, иначе не удалится
                            ]
                        }
                    ]
                }
            })

            const currentUserChannel = result.user.userChannels.find(chn => (chn.userChannel as ChannelLinkInterface).id === foundUserChannel.userChannel.id )
            console.log('cu', currentUserChannel)
            await telegramContext.send(`Подканал ${foundChannelToRewrite.link} был успешно удалён`)
            return await telegramContext.scene.enter(MAIN_CHANNELS_TO_REWRITE_PAGE, {
                state : {
                    channelsToRewrite : currentUserChannel.channelsToRewrite,
                    foundUserChannel : currentUserChannel
                }
            })
        }

    }
}
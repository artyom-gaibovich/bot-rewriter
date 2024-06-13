import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {ADD_CHANNEL_TO_REWRITE_SCENE, MAIN_CHANNELS_TO_REWROTE_SCENE} from "../scenes.types";
import {Inject} from "@nestjs/common";
import {ChannelLinkInterface} from "../../../../model/link/channel.link.interface";
import {EDIT_CHANNEL_TO_REWRITE_SCENE} from "../../scenes.types";

export interface AddUserChannelSceneInterface extends Record<string, any> {
    isChannelExists : boolean
    foundChannelToRewrite : ChannelLinkInterface
}

export type AddUserChannelSceneContext = TelegramContextModel & StepContext<AddUserChannelSceneInterface>


@Scene(EDIT_CHANNEL_TO_REWRITE_SCENE)
export class AddChannelToRewriteScene {

    constructor(
        @Inject('CHANNEL_MANAGER') private channelManager : ChannelManagerInterface,
        @Inject('CUSTOM_CHANNEL_CHECKER') private checker : ChannelCheckerInterface,
    ) {
    }


    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : AddUserChannelSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            telegramContext.scene.state.isChannelExists = false
        }
    }
    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : AddUserChannelSceneContext) {
        const foundUserChannel = telegramContext.scene.state.foundUserChannel

        if (telegramContext.text === 'Отменить') {
            return await telegramContext.scene.enter(MAIN_CHANNELS_TO_REWROTE_SCENE, {
                state : {
                    foundUserChannel
                }
            })
        }
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send('Отправьте ссылку на телеграм канал, откуда будем переписывать контент', {
                reply_markup : {
                    resize_keyboard : true,
                    keyboard : [[{text : 'Отменить'}]]
                }
            })
        }

        const isChannelExists = (await this.checker.checkByLinks([
            {link : telegramContext.text}
        ])).checkedChannels[0].isChannelExists

        if (isChannelExists) {

            const result = await this.channelManager.addChannel({
                user : {
                    id : telegramContext.from.id,
                    userChannels : [
                        {
                            userChannel : {link :
                                (foundUserChannel.userChannel as ChannelLinkInterface).link,
                                id : (foundUserChannel.userChannel as ChannelLinkInterface).id,},
                            channelsToRewrite : [
                                {link : telegramContext.text}
                            ]
                        }
                    ]
                }
            })

            const newChannel = result.user.userChannels.find(chn => (chn.userChannel as ChannelLinkInterface).link ===  (foundUserChannel.userChannel as ChannelLinkInterface).link)
            await telegramContext.send('Подканал был успешно добавлен!', {
                reply_markup : {
                    remove_keyboard : true
                }
            })
            return await telegramContext.scene.enter(MAIN_CHANNELS_TO_REWROTE_SCENE, {
                state : {
                    foundUserChannel : newChannel
                }
            })
        }
        else {
            await telegramContext.send('Подканал не был добавлен. Либо он не существует, либо вы отправили некорректную ссылку.')
        }



    }
}
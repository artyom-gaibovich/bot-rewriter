import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {ADD_USER_CHANNEL_SCENE, MAIN_CHANNEL_SCENE} from "../scenes.types";
import {Inject} from "@nestjs/common";
import {ChannelManagerInterface} from "../../../manager/channel/channel.manager.interface";
import {LinkValidatorInterface} from "../../../validator/link.validator.interface";

export interface AddUserChannelSceneInterface extends Record<string, any> {
    isChannelExists : boolean
}

export type AddUserChannelSceneContext = TelegramContextModel & StepContext<AddUserChannelSceneInterface>


@Scene(ADD_USER_CHANNEL_SCENE)
export class AddUserChannelScene {

    constructor(
        @Inject('LINK_VALIDATOR') private linkValidator : LinkValidatorInterface,
        @Inject('CHANNEL_MANAGER') private channelManager : ChannelManagerInterface,
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
        if (telegramContext.text === 'Назад') {
            return await telegramContext.scene.enter(MAIN_CHANNEL_SCENE)
        }
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send(`Отправьте в следующем формате : [название канала] [категория]`, {
                reply_markup : {
                    resize_keyboard : true,
                    keyboard : [[{text : 'Назад'}]]
                }
            })
        }

        if (this.linkValidator.validate({link : telegramContext.text})) {
            await this.channelManager.addChannel({
                user : {
                    id : telegramContext.from.id,
                    userChannels : [
                        {
                            userChannel : {link : telegramContext.text.replace('https://', '')},
                        }
                    ]
                }
            })
            await telegramContext.send('Канал был успешно добавлен!', {
                reply_markup : {
                    remove_keyboard : true
                }
            })
            return await telegramContext.scene.enter(MAIN_CHANNEL_SCENE)
        }
        else {
            await telegramContext.send('Канал не был добавлен, отправьте в корректном формате.', {
                reply_markup : {
                    resize_keyboard : true,
                    keyboard : [[{text : 'Назад'}]]
                }
            })
        }

    }
}
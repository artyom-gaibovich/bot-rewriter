import {UserChannel} from "../../repository/channel/channel.model";
import {TelegramContextModel} from "../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {ADD_USER_CHANNEL_SCENE, MAIN_CHANNEL_SCENE} from "./scenes.types";
import {ChannelMockRepository} from "../../repository/channel/channel-mock.repository";
import {MainChannelSceneContext} from "./main-channel-scene";
import {ChannelChecker} from "../../checker/channel.checker";
import {ContentAgencyClient} from "../../client/content-agency.client";

export interface AddUserChannelSceneInterface extends Record<string, any> {
    isChannelAdded : boolean
}

export type AddUserChannelSceneContext = TelegramContextModel & StepContext<AddUserChannelSceneInterface>


@Scene(ADD_USER_CHANNEL_SCENE)
export class AddUserChannelScene {

    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : AddUserChannelSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            telegramContext.scene.state.isChannelAdded = false
        }
    }
    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : AddUserChannelSceneContext) {
        if (telegramContext.text === 'Назад') {
            return await telegramContext.scene.enter(MAIN_CHANNEL_SCENE)
        }
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send('Отправьте ссылку на ваш телеграм канал', {
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
            await telegramContext.send('Канал был успешно добавлен!', {
                reply_markup : {
                    remove_keyboard : true
                }
            })
            return await telegramContext.scene.enter(MAIN_CHANNEL_SCENE)
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
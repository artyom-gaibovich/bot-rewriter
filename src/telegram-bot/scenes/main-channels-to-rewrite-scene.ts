import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {ChannelMockRepository} from "../../repository/channel/channel-mock.repository";
import {
    ADD_CHANNEL_TO_REWRITE_SCENE, DELETE_USER_CHANNEL_SCENE,
    EDIT_CHANNEL_TO_REWRITE_SCENE, MAIN_CHANNEL_SCENE,
    MAIN_CHANNELS_TO_REWROTE_SCENE
} from "./scenes.types";
import {UserChannel} from "../../model/channel.model";
import {TelegramContextModel} from "../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {ChannelLinkInterface} from "../../model/link/channel.link.interface";
import {ContentRewriter} from "../../rewriter/content.rewriter";
import {ContentAgencyClient} from "../../client/content-agency.client";

export interface MainChannelsToRewriteSceneInterface extends Record<string, any> {
    foundUserChannel : UserChannel
    channelsToRewrite : ChannelLinkInterface[] //НАДО ТИПИЗИРОВАТЬ, ЧТО ЭТО КАНАЛЫ ДЛЯ ПЕРЕПИСЫВАНИЯ
    generatedContent : string
}

export type MainChannelsToRewriteSceneContext = TelegramContextModel & StepContext<MainChannelsToRewriteSceneInterface>

@Scene(MAIN_CHANNELS_TO_REWROTE_SCENE)
export class MainChannelsToRewriteScene {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : MainChannelsToRewriteSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            const repository = new ChannelMockRepository()
            const foundUserChannel = telegramContext.scene.state.foundUserChannel
            telegramContext.scene.state.channelsToRewrite = (await repository.findOne(foundUserChannel.userChannel.id)).channelsToRewrite
        }
    }


    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : MainChannelsToRewriteSceneContext) {
        const foundUserChannel = telegramContext.scene.state.foundUserChannel

        if (telegramContext.text === 'Генерировать контент' || telegramContext.text === 'Перегенерировать контент') {
            //если Перегенерировать контент - я сделаю логику такую, чтобы уже другой запрос шёл.
            const contentRewriter = new ContentRewriter({link : 'http://localhost:4000/channels/posts'}, new ContentAgencyClient())
            const rewrittenContent = await contentRewriter.rewrite({
                channelsToRewrite : telegramContext.scene.state.channelsToRewrite
            })
            await telegramContext.reply(rewrittenContent.rewrittenContent.slice(0,4000))
            await telegramContext.reply('Контент был успешно сгенерирован')
            telegramContext.scene.state.generatedContent = rewrittenContent.rewrittenContent
        }
        if (telegramContext.text === 'Назад') {
            return telegramContext.scene.enter(MAIN_CHANNEL_SCENE)
        }
        if (telegramContext.text === 'Удалить канал') {
            return telegramContext.scene.enter(DELETE_USER_CHANNEL_SCENE, {
                state : {
                    userChannelToDelete : foundUserChannel
                }
            })
        }
        if (telegramContext.text === 'Добавить подканал') {
            return telegramContext.scene.enter(ADD_CHANNEL_TO_REWRITE_SCENE, {
                state : {foundUserChannel}
            })


        }
        //Проверяем, выбрал ли пользователь канал из ему предложенных
        if (telegramContext.scene.state.channelsToRewrite.map(chn=>chn.link).includes(telegramContext.text)) {
            const foundChannelToRewrite : ChannelLinkInterface = telegramContext.scene.state.channelsToRewrite.find(chn => chn.link === telegramContext.text)
            return telegramContext.scene.enter(EDIT_CHANNEL_TO_REWRITE_SCENE, {state : {foundChannelToRewrite, foundUserChannel}}) //УРАА, УДАЛОСЬ ПРОКИНУТЬ
        }
        //


        //ПЕРЕВОДИМ НА ДРУГУЮ СЦЕНУ, ИЛИ ШАГ, ГДЕ ДОБАВЛЯЕТ КАНАЛ, А ЗАТЕМ НАЗАД ИДЁМ
        const channelsToRewrite = telegramContext.scene.state.channelsToRewrite
        const channelsToRewriteCount = telegramContext.scene.state.channelsToRewrite.length
        const channelsToRewriteLimit = 5
        const channelKeyboard = channelsToRewrite.map(chn => {
            return [{text : chn.link}]
        })
        const rewriteContentKeyboard = [
            [{text : telegramContext.scene.state.generatedContent ? 'Перегенерировать контент' : 'Генерировать контент'}]
        ]
        const addChannelKeyboard = [
            [{text : 'Добавить подканал'}],
        ]
        const backKeyboard = [
            [{text : 'Назад'}],
        ]
        const limitKeyboard = [
            [{text : 'Повысить лимит'}],
        ]
        const deleteChannelKeyboard = [
            [{text : 'Удалить канал'}]
        ]
        let mainKeyboard = []
        if (channelsToRewriteCount === channelsToRewriteLimit) {
            mainKeyboard = [...rewriteContentKeyboard, ...limitKeyboard, ...channelKeyboard]
        }
        if (channelsToRewriteCount > 0 && channelsToRewriteCount < channelsToRewriteLimit) {
            mainKeyboard = [...rewriteContentKeyboard, ...addChannelKeyboard, ...channelKeyboard]
        }
        if (channelsToRewriteCount === 0) {
            mainKeyboard = [...addChannelKeyboard]
        }
        await telegramContext.send('Выберите дальнейшее действие', {
            reply_markup : {
                resize_keyboard : true,
                remove_keyboard : true,
                keyboard : [...mainKeyboard, ...deleteChannelKeyboard, ...backKeyboard]
            }
        })

    }
}
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";

import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {ChannelLinkInterface} from "../../../model/link/channel.link.interface";
import {UserChannelInterface} from "../../../model/channel.interface";
import {Inject} from "@nestjs/common";
import {ContentRewriterInterface} from "../../../rewriter/content.rewriter.interface";
import {UserRepositoryInterface} from "../../../repository/user/user.repository.interface";
import {
    ADD_CHANNEL_TO_REWRITE_PAGE,
    DELETE_USER_CHANNEL_PAGE, IMPROVE_LIMITS,
    MAIN_CHANNEL_PAGE, MAIN_CHANNEL_TO_REWRITE_PAGE, MAIN_CHANNELS_TO_REWRITE_PAGE,
} from "../pages.types";
import {CONTENT_REWRITER} from "../../../constants/DI.constants";

export interface MainChannelsToRewriteSceneInterface extends Record<string, any> {
    foundUserChannel : UserChannelInterface
    channelsToRewrite : ChannelLinkInterface[] //НАДО ТИПИЗИРОВАТЬ, ЧТО ЭТО КАНАЛЫ ДЛЯ ПЕРЕПИСЫВАНИЯ
    generatedContent : string
}

export type MainChannelsToRewriteSceneContext = TelegramContextModel & StepContext<MainChannelsToRewriteSceneInterface>

@Scene(MAIN_CHANNELS_TO_REWRITE_PAGE)
export class MainChannelsToRewrite {
    constructor(
        @Inject(CONTENT_REWRITER) private contentRewriter : ContentRewriterInterface)
    {
    }
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : MainChannelsToRewriteSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            telegramContext.scene.state.channelsToRewrite = telegramContext.scene.state.foundUserChannel.channelsToRewrite
        }
    }


    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : MainChannelsToRewriteSceneContext) {
        const foundUserChannel = telegramContext.scene.state.foundUserChannel

        if (telegramContext.text === 'Генерировать контент' || telegramContext.text === 'Перегенерировать контент') {
            //если Перегенерировать контент - я сделаю логику такую, чтобы уже другой запрос шёл.
            const rewrittenContent = await this.contentRewriter.rewrite({
                channelsToRewrite : telegramContext.scene.state.channelsToRewrite
            })
            await telegramContext.reply(rewrittenContent.rewrittenContent)
            await telegramContext.reply('Контент был успешно сгенерирован')
            telegramContext.scene.state.generatedContent = rewrittenContent.rewrittenContent
        }
        if (telegramContext.text === 'Назад') {
            return telegramContext.scene.enter(MAIN_CHANNEL_PAGE)
        }
        if (telegramContext.text === 'Повысить лимит') {
            return telegramContext.scene.enter(IMPROVE_LIMITS, {
                state : {
                    flag : 'MAIN_CHANNELS_TO_REWRITE'
                }
            })
        }
        if (telegramContext.text === 'Удалить канал') {
            return telegramContext.scene.enter(DELETE_USER_CHANNEL_PAGE, {
                state : {
                    userChannelToDelete : foundUserChannel
                }
            })
        }
        if (telegramContext.text === 'Добавить подканал') {
            return telegramContext.scene.enter(ADD_CHANNEL_TO_REWRITE_PAGE, {
                state : {foundUserChannel}
            })


        }
        //Проверяем, выбрал ли пользователь канал из ему предложенных
        if (telegramContext.scene.state.channelsToRewrite.map(chn=>chn.link).includes(telegramContext.text)) {
            const foundChannelToRewrite : ChannelLinkInterface = telegramContext.scene.state.channelsToRewrite.find(chn => chn.link === telegramContext.text)
            return telegramContext.scene.enter(MAIN_CHANNEL_TO_REWRITE_PAGE, {state : {foundChannelToRewrite, foundUserChannel}}) //УРАА, УДАЛОСЬ ПРОКИНУТЬ
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
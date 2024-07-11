import {TelegramContextModel} from "../../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {Inject} from "@nestjs/common";
import {ChannelManagerInterface} from "../../../../manager/channel/channel.manager.interface";
import {LinkValidatorInterface} from "../../../../validator/link.validator.interface";
import {
    ADD_CHANNEL_CATEGORY,
    ADD_USER_CHANNEL_PAGE, EDIT_CHANNEL_TO_REWRITE_PAGE, EDIT_PROMPT,
    MAIN_CHANNEL_PAGE,
    MAIN_CHANNELS_TO_REWRITE_PAGE
} from "../../pages.types";
import {CHANNEL_MANAGER, LINK_VALIDATOR} from "../../../../constants/DI.constants";
import {UserChannelInterface} from "../../../../model/channel.interface";
import {ChannelLinkInterface} from "../../../../model/link/channel.link.interface";

export interface EditPromptSceneInterface extends Record<string, any> {
    category : CategoryInterface
    userChannels : UserChannelInterface[]
    currentPrompt : string
}

export type EditPromptSceneContext = TelegramContextModel & StepContext<EditPromptSceneInterface>


@Scene(EDIT_PROMPT)
export class EditPrompt {


    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : EditPromptSceneContext) {

    }
    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : EditPromptSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send(`Отправьте промпт`, {
                reply_markup : {
                    remove_keyboard : true,
                    resize_keyboard : true,
                    keyboard : [[{text : 'Вернуться обратно'}]]
                }
            })
        }
        if (telegramContext.text === 'Вернуться обратно') {
            return await telegramContext.scene.enter(MAIN_CHANNEL_PAGE)
        }

        await telegramContext.send('Промпт был успешно добавлен', {
            reply_markup : {
                one_time_keyboard : true,
                remove_keyboard : true
            }
        })
        return await telegramContext.scene.enter(MAIN_CHANNELS_TO_REWRITE_PAGE, {
            state : {
                currentPrompt : telegramContext.text
            }
        })
    }




}
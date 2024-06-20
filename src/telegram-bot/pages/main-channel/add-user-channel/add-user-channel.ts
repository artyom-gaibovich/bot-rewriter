import {TelegramContextModel} from "../../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {Inject} from "@nestjs/common";
import {ChannelManagerInterface} from "../../../../manager/channel/channel.manager.interface";
import {LinkValidatorInterface} from "../../../../validator/link.validator.interface";
import {ADD_CHANNEL_CATEGORY, ADD_USER_CHANNEL_PAGE, MAIN_CHANNEL_PAGE} from "../../pages.types";
import {CHANNEL_MANAGER, LINK_VALIDATOR} from "../../../../constants/DI.constants";

export interface AddUserChannelSceneInterface extends Record<string, any> {
    category : CategoryInterface
}

export type AddUserChannelSceneContext = TelegramContextModel & StepContext<AddUserChannelSceneInterface>


@Scene(ADD_USER_CHANNEL_PAGE)
export class AddUserChannel {

    constructor(
        @Inject(LINK_VALIDATOR) private linkValidator : LinkValidatorInterface,
        @Inject(CHANNEL_MANAGER) private channelManager : ChannelManagerInterface,
    ) {
    }



    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : AddUserChannelSceneContext) {

    }
    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : AddUserChannelSceneContext) {
        if (telegramContext.text === 'Вернуться обратно') {
            return await telegramContext.scene.enter(MAIN_CHANNEL_PAGE)
        }
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send(`Отправьте в следующем формате : [название канала] [категория]`, {
                reply_markup : {
                    resize_keyboard : true,
                    keyboard : [[{text : 'Вернуться обратно'}]]
                }
            })
        }

        if (this.linkValidator.validate({link : telegramContext.text})) {
            const result = await this.channelManager.addChannel({
                user : {
                    id : telegramContext.from.id,
                    userChannels : [
                        {
                            userChannel : {link : `${telegramContext.text.replace('https://', '')} | ${telegramContext.scene.state.category.title}`},
                        }
                    ]
                }
            })
            await telegramContext.send('Канал был успешно добавлен!', {
                reply_markup : {
                    remove_keyboard : true
                }
            })
            return await telegramContext.scene.enter(MAIN_CHANNEL_PAGE)
        }
        else {
            await telegramContext.send('Канал не был добавлен, отправьте в корректном формате.', {
                reply_markup : {
                    resize_keyboard : true,
                    keyboard : [[{text : 'Вернуться обратно'}]]
                }
            })
        }

    }
}
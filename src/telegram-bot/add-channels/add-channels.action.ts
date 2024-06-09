import {AddStep, Ctx, Scene, SceneEnter, SceneLeave} from "nestjs-puregram";
import {MessageContext} from "puregram";
import {StepContext} from "@puregram/scenes";
import {SessionInterface} from "@puregram/session";
import {Inject, Injectable} from "@nestjs/common";
import {LinkInterface} from "../../model/link/link.interface";
import {ChannelCheckerInterface} from "../../checker/channel.checker.interface";
import {KeyboardInterface} from "../keyboard/keyboard.interface";

interface AddChannelsInterface extends Record<string, any>{
    userChannel : LinkInterface
    channels : LinkInterface[]
}

@Injectable()
@Scene('AddChannels')
export class AddChannelsAction {


    constructor(
        @Inject('CUSTOM_CHANNEL_CHECKER') private checker : ChannelCheckerInterface,
        @Inject('MAIN_KEYBOARD') private keyboard : KeyboardInterface,
    ) {
    }

    @SceneEnter()
    async enter(@Ctx() telegramContext: MessageContext & StepContext<AddChannelsInterface>) {
        if (telegramContext.scene.step.firstTime) {
            await telegramContext.send('Добавь свой телеграм канал :)', {
                reply_markup : {
                    remove_keyboard : true
                }
            })
            telegramContext.scene.state.channels = []
        }
    }
    @SceneLeave()
    async leave(@Ctx() telegramContext: MessageContext & StepContext<AddChannelsInterface>) {
        if (telegramContext.scene.step.firstTime) {
            await telegramContext.send('Выход')
        }

    }
    @AddStep(1)
    async step1(@Ctx() telegramContext: MessageContext & StepContext<AddChannelsInterface>) {
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send('1-ый шаг')
        }
        return await telegramContext.scene.step.next()
    }
    @AddStep(2)
    async step2(@Ctx() telegramContext: MessageContext & StepContext<AddChannelsInterface>) {
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send('2-ый шаг')
        }
        return await telegramContext.scene.step.next()
    }

    @AddStep(3)
    async step3(@Ctx() telegramContext: MessageContext & StepContext<AddChannelsInterface>) {
        if (telegramContext.scene.step.firstTime) {
            return await telegramContext.send('3-ый шаг')
        }
        return await telegramContext.scene.step.go(0)
    }


}
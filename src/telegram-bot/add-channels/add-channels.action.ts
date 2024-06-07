import {AddStep, Ctx, Scene, SceneEnter, SceneLeave} from "nestjs-puregram";
import {MessageContext} from "puregram";
import {StepContext} from "@puregram/scenes";
import {SessionInterface} from "@puregram/session";
import {Inject, Injectable} from "@nestjs/common";
import {LinkModel} from "../../model/link/link.model";
import {ChannelCheckerInterface} from "../../checker/channel.checker.interface";
import {KeyboardInterface} from "../keyboard/keyboard.interface";

interface AddChannelsInterface extends Record<string, any>{
    userChannel : LinkModel
    channels : LinkModel[]
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
    async leave(@Ctx() telegramContext: MessageContext & StepContext<AddChannelsInterface>): Promise<unknown> {
        //должен быть некий request converter
        if (telegramContext.scene.state.channels.length > 3) {
            await telegramContext.send('Вам нельзя добавить больше 3-х каналов, нету подписки.', this.keyboard)
            return await telegramContext.send('Выберите дальнейшее действие', {
                reply_markup : this.keyboard
            })
        }
        const checkedChannels = (await this.checker.checkByLinks(telegramContext.scene.state.channels)).checkedChannels

        for (const channels of checkedChannels) {
            await telegramContext.send(`Канал ${channels.channelLink}` +
                (channels.isChannelExists ? ' был добавлен 🎉' : ' не был добавлен, т.к. не существует, либо вы указали некорректную ссылку.😭')
            );
        }

        return await telegramContext.send('Выберите дальнейшее действие', {
            reply_markup : this.keyboard
        })

    }
    @AddStep(1)
    async userChannel(@Ctx() telegramContext: MessageContext & SessionInterface  & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (telegramContext.scene.step.firstTime || !telegramContext.hasText) {
            return await telegramContext.send('\n\n Для этого канала мы переписывать контент с других каналов😎😉');
        }
        telegramContext.scene.state.userChannel = {
            link : telegramContext.text
        }
        return await telegramContext.scene.step.next()
    }
    @AddStep(2)
    async firstChannel(@Ctx() telegramContext: MessageContext & SessionInterface  & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (telegramContext.scene.step.firstTime || !telegramContext.hasText) {
            return await telegramContext.send('Отправь ссылки на телеграм каналы для переписывания. Раздели ссылки запятой.');
        }
        telegramContext.scene.state.channels = telegramContext.text.split(',').map(link => {
            return {link: link}
        })
        return await telegramContext.scene.step.next()
    }


}
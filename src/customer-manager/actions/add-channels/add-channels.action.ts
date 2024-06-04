import {AddStep, Ctx, Scene, SceneEnter, SceneLeave} from "nestjs-puregram";
import {MessageContext} from "puregram";
import {StepContext} from "@puregram/scenes";
import {SessionInterface} from "@puregram/session";
import {Inject, Injectable} from "@nestjs/common";
import {LinkModel} from "../../../model/link/link.model";
import {ChannelCheckerInterface} from "../../../checker/channel.checker.interface";

interface AddChannelsInterface extends Record<string, any>{
    userChannel : LinkModel
    channels : LinkModel[]
}

@Injectable()
@Scene('AddChannels')
export class AddChannelsAction {


    constructor(@Inject('CUSTOM_CHANNEL_CHECKER') private checker : ChannelCheckerInterface) {
    }

    @SceneEnter()
    enter(@Ctx() telegramContext: MessageContext & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (telegramContext.scene.step.firstTime) {
            telegramContext.scene.state.channels = []
            return telegramContext.send('Отправь название своего телеграм канала :)');
        }
    }
    @SceneLeave()
    async leave(@Ctx() telegramContext: MessageContext & StepContext<AddChannelsInterface>): Promise<void> {
        //должен быть некий request converter
        const checkedChannels = (await this.checker.checkByLinks(telegramContext.scene.state.channels)).checkedChannels

        checkedChannels.map(channels => {
            telegramContext.send(`Канал ${channels.channelLink}` + (channels.isChannelExists ? ' был добавлен 🎉' : ' не был добавлен, т.к. не существует, либо вы указали некорректную ссылку.😭'));
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
            return await telegramContext.send('Отправь название 1-го канала');
        }
        telegramContext.scene.state.channels = [...telegramContext.scene.state.channels, {link : telegramContext.text}]
        return await telegramContext.scene.step.next()
    }
    @AddStep(3)
    async secondChannel(@Ctx() telegramContext: MessageContext & SessionInterface  & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (telegramContext.scene.step.firstTime || !telegramContext.hasText) {
            return await telegramContext.send('Отправь название 2-го канала');
        }
        telegramContext.scene.state.channels = [...telegramContext.scene.state.channels, {link : telegramContext.text}]

        return await telegramContext.scene.step.next()
    }
    @AddStep(4)
    async thirdChannel(@Ctx() telegramContext: MessageContext & SessionInterface  & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (telegramContext.scene.step.firstTime || !telegramContext.hasText) {
            console.log(telegramContext.scene.state)

            return await telegramContext.send('Отправь название 3-го канала');
        }
        telegramContext.scene.state.channels = [...telegramContext.scene.state.channels, {link : telegramContext.text}]
        return await telegramContext.scene.step.next()
    }

}
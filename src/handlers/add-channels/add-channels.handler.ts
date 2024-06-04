import {AddStep, Ctx, Scene, SceneEnter, SceneLeave} from "nestjs-puregram";
import {MessageContext} from "puregram";
import {StepContext} from "@puregram/scenes";
import {SessionInterface} from "@puregram/session";
import {Inject, Injectable} from "@nestjs/common";
import {LinkModel} from "../../model/link/link.model";
import {ChannelCheckerInterface} from "../../checker/channel.checker.interface";

interface AddChannelsInterface extends Record<string, any>{
    userChannel : LinkModel
    channels : LinkModel[]
}

@Injectable()
@Scene('AddChannels')
export class AddChannelsHandler {


    constructor(@Inject('CUSTOM_CHANNEL_CHECKER') private checker : ChannelCheckerInterface) {
    }

    @SceneEnter()
    enter(@Ctx() context: MessageContext & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (context.scene.step.firstTime) {
            context.scene.state.channels = []
            return context.send('Отправь название своего телеграм канала :)');
        }
    }
    @SceneLeave()
    async leave(@Ctx() context: MessageContext & StepContext<AddChannelsInterface>): Promise<void> {
        //должен быть некий request converter
        const checkedChannels = (await this.checker.checkByLinks(context.scene.state.channels)).checkedChannels

        checkedChannels.map(channels => {
            context.send(`Канал ${channels.channelLink}` + (channels.isChannelExists ? ' был добавлен 🎉' : ' не был добавлен, т.к. не существует, либо вы указали некорректную ссылку.😭'));
        })

    }
    @AddStep(1)
    async userChannel(@Ctx() context: MessageContext & SessionInterface  & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (context.scene.step.firstTime || !context.hasText) {
            return await context.send('\n\n Для этого канала мы переписывать контент с других каналов😎😉');
        }
        context.scene.state.userChannel = {
            link : context.text
        }
        return await context.scene.step.next()
    }
    @AddStep(2)
    async firstChannel(@Ctx() context: MessageContext & SessionInterface  & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (context.scene.step.firstTime || !context.hasText) {
            return await context.send('Отправь название 1-го канала');
        }
        context.scene.state.channels = [...context.scene.state.channels, {link : context.text}]
        return await context.scene.step.next()
    }
    @AddStep(3)
    async secondChannel(@Ctx() context: MessageContext & SessionInterface  & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (context.scene.step.firstTime || !context.hasText) {
            return await context.send('Отправь название 2-го канала');
        }
        context.scene.state.channels = [...context.scene.state.channels, {link : context.text}]

        return await context.scene.step.next()
    }
    @AddStep(4)
    async thirdChannel(@Ctx() context: MessageContext & SessionInterface  & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (context.scene.step.firstTime || !context.hasText) {
            console.log(context.scene.state)

            return await context.send('Отправь название 3-го канала');
        }
        context.scene.state.channels = [...context.scene.state.channels, {link : context.text}]
        return await context.scene.step.next()
    }

}
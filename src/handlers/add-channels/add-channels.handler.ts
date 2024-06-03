import {AddStep, Ctx, Scene, SceneEnter, SceneLeave} from "nestjs-puregram";
import {MessageContext} from "puregram";
import {StepContext} from "@puregram/scenes";
import {SessionInterface} from "@puregram/session";
import {AddChannelsRequestModel} from "../../model/request/add-channels.request.model";
import {SendToCheckChannelsAction} from "../../actions/send-to-check-channels/send-to-check-channels.action";
import {Injectable} from "@nestjs/common";
import {UserChannel} from "../../model/response/get-user-channels.response.model";
import {LinkModel} from "../../model/link.model";
import {AddChannelsConvertRequestAction} from "../../actions/convert-request/add-channels-convert-request.action";
import {ChannelRepository} from "../../repository/channel.repository";

interface AddChannelsInterface extends Record<string, any>{
    userChannel : LinkModel
    channels : LinkModel[]
}

@Injectable()
@Scene('AddChannels')
export class AddChannelsHandler {

    constructor(
        private channelRepository : ChannelRepository
    ) {
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
        const response = await this.channelRepository.checkByLinks(context.scene.state.channels)

        response.checkedChannels.map(channels => {
            context.send(`Канал ${channels.channelLink}` + (channels.isChannelExists ? ' был добавлен 🎉' : ' не был добавлен, т.к. не существует, либо вы указали некорректную ссылку.😭'));
        })
        console.log(response)

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
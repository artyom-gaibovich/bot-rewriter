import {AddStep, Ctx, Scene, SceneEnter, SceneLeave} from "nestjs-puregram";
import {MessageContext} from "puregram";
import {SceneContext, StepContext} from "@puregram/scenes";
import {SessionInterface} from "@puregram/session";

interface AddChannelsInterface extends Record<string, any>{
    userChannel : string
    channels : string[]
}
@Scene('AddChannels')
export class AddChannelsAction {
    @SceneEnter()
    enter(@Ctx() context: MessageContext & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (context.scene.step.firstTime) {
            context.scene.state.channels = []
            return context.send('Welcome!');
        }
    }
    @SceneLeave()
    leave(@Ctx() context: MessageContext & StepContext<AddChannelsInterface>): Promise<unknown> {
        const request = {
            link: context.scene.state.userChannel,
            channelsToRewrite: context.scene.state.channels,
        }
        console.log(request)
        return context.send('Каналы были успешно добавлены!');

    }

    @AddStep(1)
    userChannel(@Ctx() context: MessageContext & SessionInterface  & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (context.scene.step.firstTime || !context.hasText) {
            return context.send('Отправь название своего телеграм канала');
        }
        context.scene.state.userChannel = context.text
        return context.scene.step.next()
    }
    @AddStep(2)
    firstChannel(@Ctx() context: MessageContext & SessionInterface  & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (context.scene.step.firstTime || !context.hasText) {
            return context.send('Отправь название 1-го канала');
        }
        context.scene.state.channels = [...context.scene.state.channels, context.text]
        console.log(context.scene.state.channels)
        return context.scene.step.next()
    }
    @AddStep(3)
    secondChannel(@Ctx() context: MessageContext & SessionInterface  & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (context.scene.step.firstTime || !context.hasText) {
            return context.send('Отправь название 2-го канала');
        }
        context.scene.state.channels = [...context.scene.state.channels, context.text]
        console.log(context.scene.state.channels)

        return context.scene.step.next()
    }
    @AddStep(4)
    thirdChannel(@Ctx() context: MessageContext & SessionInterface  & StepContext<AddChannelsInterface>): Promise<unknown> {
        if (context.scene.step.firstTime || !context.hasText) {
            console.log(context.scene.state)

            return context.send('Отправь название 3-го канала');
        }
        context.scene.state.channels = [...context.scene.state.channels, context.text]
        return context.scene.step.next()
    }

}
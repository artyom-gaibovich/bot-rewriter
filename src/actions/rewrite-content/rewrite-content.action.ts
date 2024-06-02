import {AddStep, Ctx, Scene, SceneEnter, SceneLeave} from "nestjs-puregram";
import {MessageContext} from "puregram";
import {StepContext} from "@puregram/scenes";
import {SessionInterface} from "@puregram/session";
import {GetUserChannelsResponseModel, UserChannel} from "../../model/response/get-user-channels.response.model";
import {RewriteContentRequestModel} from "../../model/request/rewrite-content.request.model";
import {LinkModel} from "../../model/link.model";
import axios from "axios";
import {RewriteContentResponseNewModel} from "../../model/response/rewrite-content.response.model";

interface RewriteContentInterface extends Record<string, any>{
    userChannels : UserChannel[]
    chosenChannel : UserChannel
}


@Scene('RewriteContent')
export class RewriteContentAction {

    private async sendContentInChunks(rewrittenContent: string, @Ctx() context: MessageContext, interval: number) {
        let startIndex = 0;

        const sendChunks = async function* () {
            while (startIndex < rewrittenContent.length) {
                const endIndex = Math.min(startIndex + 4000, rewrittenContent.length);
                const chunk = rewrittenContent.substring(startIndex, endIndex);
                await context.send(chunk);
                startIndex = endIndex;
                yield;
                if (startIndex < rewrittenContent.length) {
                    await new Promise(resolve => setTimeout(resolve, interval));
                }
            }
        };

        for await (const _ of sendChunks()) {
            // Блок будет выполнен после отправки каждого чанка
        }

        await context.send(`Поздравляю, вы успешно переписали контент. \n\n<i>(P.S Вам отдался контент с выбранных телеграм каналов. Сервис для переписывания ещё не работает😓😓😓. Можете контент вставить в ChatGPT или другую нейросеть😉</i>)`, { parse_mode: "HTML" });
    }
    @SceneEnter()
    async enter(@Ctx() context: MessageContext & StepContext<RewriteContentInterface>): Promise<unknown> {

        if (context.scene.step.firstTime) {
            const responseDataMock : GetUserChannelsResponseModel = {
                userChannels : [
                    {
                        userChannel : {link : 'https://ваш_телеграм_канал_1'},
                        channelsToRewrite : [{link : 'https://t.me/zakodirovanna_telega'}, {link : 'https://t.me/habr_media'}, {link : 'https://t.me/zakodirovanna_telega'}]
                    },
                    {
                        userChannel : {link : 'https://ваш_телеграм_канал_2'},
                        channelsToRewrite : [{link : 'https://t.me/tot_proger'}, {link : 'https://t.me/habr_media'}]
                    }
                ]
            }
            const response = await new Promise<GetUserChannelsResponseModel>(resolve => {
                setTimeout(() => {
                    resolve(responseDataMock)
                }, 1000)
            })
            context.scene.state.userChannels = response.userChannels
            return context.send('Welcome!');
        }
    }
    @SceneLeave()
    async leave(@Ctx() context: MessageContext & StepContext<RewriteContentInterface>): Promise<void> {
        console.log(context.scene.state)
        const request : RewriteContentRequestModel = {
            links : context.scene.state.chosenChannel.channelsToRewrite.map(chn => {
                return {
                    link: chn.link,
                    limit : 3
                }
            }) as LinkModel[]
        }
        const response  = await axios.post<RewriteContentResponseNewModel>('http://localhost:4000/channels/posts', request)
        console.log(response.data)
        // response { channelLink: 'https://habr_media', status: 'ERROR' }, если устствутет свойство, есть свойство надо подумать
        // проблема с асинхронностью,
        const rewrittenContent = response.data.channelsWithPosts.map(chn => {
            return chn.posts.join('')
        }).join('')
        await this.sendContentInChunks(rewrittenContent, context, 2000)
    }
    @AddStep(1)
    async userChannel(@Ctx() context: MessageContext & SessionInterface  & StepContext<RewriteContentInterface>): Promise<unknown> {
        if (context.scene.step.firstTime || !context.hasText) {
            const userChannels = context.scene.state.userChannels.map((channel, i) => {
                const rewrittenChannels = (channel.channelsToRewrite.map(chn=>chn.link).join('\n— '))
                return `<b>➡️    ${channel.userChannel.link}    ⬅️</b>: \n\n\n <i>Это каналы откуда будет переписываться контент. Вы их ранее добавили.\n\n — ${rewrittenChannels} \n</i>`
            }).join('\n')
            return await context.send(`Выбери свой телеграм канал и отправь ссылку\n\n${userChannels}\n(P.S.Хранилище каналов ещё не сделано, представим, что добавленные каналы оттуда прилетают)`, {
                parse_mode : 'HTML'
            });

        }
        const chosenChannel = context.scene.state.userChannels.find(chn => {
            if (chn.userChannel.link === context.text) {
                return chn
            }
        })

        if (!chosenChannel) {
            await context.send('Некорректная ссылка. Введите канал, предоженный из списка')
        }
        else {
            context.scene.state.chosenChannel = chosenChannel
            return await context.scene.step.next()
        }

    }

}
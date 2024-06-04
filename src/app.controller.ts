import {Ctx, Hears, Update} from "nestjs-puregram";
import {MessageContext} from "puregram";
import {StepContext} from "@puregram/scenes";


@Update()
export class AppController {
    @Hears('/start')
    async start(@Ctx() telegramContext: MessageContext & StepContext): Promise<unknown> {
        await telegramContext.send('Вас приветствует бот для копирайтинга контента с других телеграм каналов!')
        return await telegramContext.send(`Доступные команды: 
        \n/channels — Побавить каналы для копирайтинга. Бесплатно можно добавить 3 канала.
        \n/rewrite - Переписать контент с выбранных каналов.
        `)
    }
    @Hears('/channels')
    async signup(@Ctx() telegramContext: MessageContext & StepContext): Promise<unknown> {
        return telegramContext.scene.enter('AddChannels');
    }
    @Hears('/rewrite')
    async rewrite(@Ctx() telegramContext: MessageContext & StepContext): Promise<unknown> {
        return telegramContext.scene.enter('RewriteContent');
    }
}
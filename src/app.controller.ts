import {Ctx, Hears, Update} from "nestjs-puregram";
import {MessageContext} from "puregram";
import {StepContext} from "@puregram/scenes";


@Update()
export class AppController {
    @Hears('/start')
    async start(@Ctx() context: MessageContext & StepContext): Promise<unknown> {
        await context.send('Вас приветствует бот для копирайтинга контента с других телеграм каналов!')
        return await context.send(`Доступные команды: 
        \n/channels — Побавить каналы для копирайтинга. Бесплатно можно добавить 3 канала.
        \n/rewrite - Переписать контент с выбранных каналов.
        `)
    }
    @Hears('/channels')
    async signup(@Ctx() context: MessageContext & StepContext): Promise<unknown> {
        return context.scene.enter('AddChannels');
    }
    @Hears('/rewrite')
    async rewrite(@Ctx() context: MessageContext & StepContext): Promise<unknown> {
        return context.scene.enter('RewriteContent');
    }
}
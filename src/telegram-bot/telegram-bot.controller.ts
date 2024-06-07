import {Ctx, Hears, Update} from "nestjs-puregram";
import {MessageContext} from "puregram";
import {StepContext} from "@puregram/scenes";
import {KeyboardInterface} from "./keyboard/keyboard.interface";
import {ReplyMarkupUnion} from "puregram/lib/generated";
import {Inject, Injectable} from "@nestjs/common";


@Update()
@Injectable()
export class TelegramBotController {
    constructor(@Inject('MAIN_KEYBOARD') private keyboard : KeyboardInterface) {
    }
    @Hears('/start')
    async start(@Ctx() telegramContext: MessageContext & StepContext) {
        await telegramContext.send('Вас приветствует бот для копирайтинга контента с других телеграм каналов!')
        await telegramContext.send('Что вас интересует?', {
            reply_markup : this.keyboard
        })

    }
    @Hears('Добавить каналы')
    async signup(@Ctx() telegramContext: MessageContext & StepContext): Promise<unknown> {
        return telegramContext.scene.enter('AddChannels');
    }
    @Hears('Переписать контент')
    async rewrite(@Ctx() telegramContext: MessageContext & StepContext): Promise<unknown> {
        return telegramContext.scene.enter('RewriteContent');
    }
}
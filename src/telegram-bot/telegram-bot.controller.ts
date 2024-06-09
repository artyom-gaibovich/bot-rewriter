import {Ctx, Hears, Update} from "nestjs-puregram";
import {KeyboardInterface} from "./keyboard/keyboard.interface";
import {Inject, Injectable} from "@nestjs/common";
import {TelegramContextModel} from "./model/telegram-context-model";
import {ACTIVATE_CODE_SCENE, MAIN_CHANNEL_SCENE} from "./scenes/scenes.types";


@Update()
@Injectable()
export class TelegramBotController {
    constructor(@Inject('MAIN_KEYBOARD') private keyboard : KeyboardInterface) {
    }
    @Hears('/start')
    async start(@Ctx() telegramContext: TelegramContextModel) {
        await telegramContext.scene.enter(MAIN_CHANNEL_SCENE)
    }


}
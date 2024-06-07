import {Module} from "@nestjs/common";
import {AddChannelsActionModule} from "./add-channels/add-channels.action.module";
import {RewriteContentActionModule} from "./rewrite-content/rewrite-content.action.module";
import {TelegramBotController} from "./telegram-bot.controller";
import {MainPageKeyboard} from "./keyboard/keyboard";
import {KeyboardInterface} from "./keyboard/keyboard.interface";

@Module({
    imports : [AddChannelsActionModule, RewriteContentActionModule],
    providers : [{
        provide : 'MAIN_KEYBOARD',
        useFactory : () => {
            return MainPageKeyboard
    }}, TelegramBotController],
})
export class TelegramBotModule {}
import {Module} from "@nestjs/common";
import {TelegramBotController} from "./telegram-bot.controller";
import {MainPageKeyboard} from "./keyboard/keyboard";
import {ActivateCodeScene} from "./scenes/activate-code-scene";
import {MainScene} from "./scenes/main-scene";
import {ImproveLimitsScene} from "./scenes/improve-limits-scene";
import {SupportScene} from "./scenes/support-scene";
import {MainChannelScene} from "./scenes/main-channel-scene";
import {AddUserChannelScene} from "./scenes/add-user-channel-scene";
import {MainChannelsToRewriteScene} from "./scenes/main-channels-to-rewrite-scene";
import {EditChannelToRewriteScene} from "./scenes/edit-channel-to-rewrite-scene";
import {AddChannelToRewriteScene} from "./scenes/add-channel-to-rewrite-scene";

@Module({
    imports : [AddChannelToRewriteScene, EditChannelToRewriteScene, AddUserChannelScene, MainChannelsToRewriteScene, MainChannelScene, ActivateCodeScene, MainScene, ImproveLimitsScene, SupportScene],
    providers : [{
        provide : 'MAIN_KEYBOARD',
        useFactory : () => {
            return MainPageKeyboard
    }}, TelegramBotController],
})
export class TelegramBotModule {}
import {Module} from "@nestjs/common";
import {TelegramBotController} from "./telegram-bot.controller";
import {MainPageKeyboard} from "./keyboard/keyboard";
import {ActivateCodeScene} from "./scenes/later/activate-code-scene";
import {MainScene} from "./scenes/later/main-scene";
import {ImproveLimitsScene} from "./scenes/later/improve-limits-scene";
import {SupportScene} from "./scenes/later/support-scene";
import {MainChannelScene} from "./scenes/main-channel/main-channel-scene";
import {AddUserChannelScene} from "./scenes/add-user-channel/add-user-channel-scene";
import {MainChannelsToRewriteScene} from "./scenes/main-channels-to-rewrite/main-channels-to-rewrite-scene";
import {EditChannelToRewriteScene} from "./scenes/edit-channel-to-rewrite/edit-channel-to-rewrite-scene";
import {AddChannelToRewriteScene} from "./scenes/add-channel-to-rewrite/add-channel-to-rewrite-scene";
import {DeleteUserChannelScene} from "./scenes/delete-user-channel/delete-user-channel-scene";

@Module({
    imports : [DeleteUserChannelScene, AddChannelToRewriteScene, EditChannelToRewriteScene, AddUserChannelScene, MainChannelsToRewriteScene, MainChannelScene, ActivateCodeScene, MainScene, ImproveLimitsScene, SupportScene],
    providers : [{
        provide : 'MAIN_KEYBOARD',
        useFactory : () => {
            return MainPageKeyboard
    }}, TelegramBotController],
})
export class TelegramBotModule {}
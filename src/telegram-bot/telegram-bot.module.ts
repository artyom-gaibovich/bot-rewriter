import {Module} from "@nestjs/common";
import {TelegramBotController} from "./telegram-bot.controller";
import {MainPageKeyboard} from "./keyboard/keyboard";
import {ActivateCodeScene} from "./scenes/activate-code-scene";
import {AddUserChannelsScene} from "./scenes/add-user-channels-scene";
import {MainScene} from "./scenes/main-scene";
import {ImproveLimitsScene} from "./scenes/improve-limits-scene";
import {SupportScene} from "./scenes/support-scene";
import {AddUserChannelsActionScene} from "./scenes/add-user-channels-action-scene";
import {AddRewriteChannelsScene} from "./scenes/add-rewrite-channels-scene";

@Module({
    imports : [ActivateCodeScene, AddRewriteChannelsScene,AddUserChannelsScene, MainScene,AddUserChannelsActionScene, ImproveLimitsScene, SupportScene],
    providers : [{
        provide : 'MAIN_KEYBOARD',
        useFactory : () => {
            return MainPageKeyboard
    }}, TelegramBotController],
})
export class TelegramBotModule {}
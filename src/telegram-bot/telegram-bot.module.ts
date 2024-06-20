import {Module} from "@nestjs/common";
import {TelegramBotController} from "./telegram-bot.controller";
import {MainPageKeyboard} from "./keyboard/keyboard";
import {DeleteUserChannelModule} from "./pages/main-channel/delete-user-channel/delete-user-channel.module";
import {AddChannelToRewriteModule} from "./pages/main-channel-to-rewrite/add/add-channel-to-rewrite.module";
import {AddUserChannelModule} from "./pages/main-channel/add-user-channel/add-user-channel.module";
import {MainChannelRewriteModule} from "./pages/main-channel-to-rewrite/main-channel-rewrite.module";
import {MainChannelModule} from "./pages/main-channel/main-channel.module";
import {MainChannelsToRewriteModule} from "./pages/main-channels-to-rewrite/main-channels-to-rewrite.module";
import {ADD_CHANNEL_CATEGORY} from "./pages/pages.types";
import {
    AddChannelCategoryModule
} from "./pages/main-channel/add-user-channel/add-channel-category/add-channel-category.module";
import {ActivateCodeModule} from "./pages/activate-code/activate-code.module";
import {AddChannelsPromo} from "./pages/add-channel-promo/add-channels-promo";
import {Support} from "./pages/support/support";
import {ImproveLimits} from "./pages/improve-limits/improve-limits";
import {AddChannelsPromoModule} from "./pages/add-channel-promo/add-channels-promo.module";
import {ImproveLimitsModule} from "./pages/improve-limits/improve-limits.module";
import {SupportModule} from "./pages/support/support.module";

@Module({
    imports : [AddChannelsPromoModule, SupportModule, ImproveLimitsModule, ActivateCodeModule, DeleteUserChannelModule, AddChannelToRewriteModule, AddUserChannelModule, MainChannelRewriteModule, MainChannelModule, MainChannelsToRewriteModule],
    providers : [{
        provide : 'MAIN_KEYBOARD',
        useFactory : () => {
            return MainPageKeyboard
    }}, TelegramBotController],
})
export class TelegramBotModule {}
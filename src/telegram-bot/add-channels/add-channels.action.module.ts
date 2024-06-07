import {Module} from "@nestjs/common";
import {AddChannelsAction} from "./add-channels.action";
import {ChannelRepositoryModule} from "../../repository/channel/channel.repository.module";
import {ChannelCheckerModule} from "../../checker/channel.checker.module";
import {ChannelChecker} from "../../checker/channel.checker";
import {MainPageKeyboard} from "../keyboard/keyboard";

//возможно нужно экспорт сделать
@Module({
    imports: [ChannelCheckerModule],
    providers: [{
        provide : 'MAIN_KEYBOARD',
        useFactory : () => {
            return MainPageKeyboard
        }
    },
        AddChannelsAction
    ],
})
export class AddChannelsActionModule {

}
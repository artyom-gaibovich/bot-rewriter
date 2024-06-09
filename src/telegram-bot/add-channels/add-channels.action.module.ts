import {Module} from "@nestjs/common";
import {AddChannelsAction} from "./add-channels.action";
import {ChannelCheckerModule} from "../../checker/channel.checker.module";
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
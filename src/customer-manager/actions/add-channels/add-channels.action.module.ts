import {Module} from "@nestjs/common";
import {AddChannelsAction} from "./add-channels.action";
import {ChannelRepositoryModule} from "../../../repository/channel/channel.repository.module";
import {ChannelCheckerModule} from "../../../checker/channel.checker.module";
import {ChannelChecker} from "../../../checker/channel.checker";

//возможно нужно экспорт сделать
@Module({
    imports: [ChannelCheckerModule],
    providers: [AddChannelsAction],
})
export class AddChannelsActionModule {

}
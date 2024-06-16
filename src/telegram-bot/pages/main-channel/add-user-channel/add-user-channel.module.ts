import {Module} from "@nestjs/common";
import {ChannelManagerModule} from "../../../../manager/channel/channel.manager.module";
import {ChannelCheckerModule} from "../../../../checker/channel.checker.module";
import {AddUserChannel} from "./add-user-channel";
import {LinkValidatorModule} from "../../../../validator/link.validator.module";
import {AddChannelCategoryModule} from "./add-channel-category/add-channel-category.module";

@Module({
    imports : [AddChannelCategoryModule, LinkValidatorModule, ChannelManagerModule, ChannelCheckerModule],
    providers : [AddUserChannel]
})
export class AddUserChannelModule {

}
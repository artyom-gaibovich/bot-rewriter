import {Module} from "@nestjs/common";
import {ChannelRepositoryModule} from "../../../repository/channel/channel.repository.module";
import {UserManagerModule} from "../../../manager/user/user.manager.module";
import {MainChannel} from "./main-channel";
import {UserRepositoryModule} from "../../../repository/user/user.repository.module";
import {AddChannelCategoryModule} from "./add-user-channel/add-channel-category/add-channel-category.module";
import {EditPromptModule} from "./edit-prompt/edit-prompt.module";

@Module({
    imports : [EditPromptModule, UserManagerModule, UserRepositoryModule],
    providers : [MainChannel]
})
export class MainChannelModule {

}
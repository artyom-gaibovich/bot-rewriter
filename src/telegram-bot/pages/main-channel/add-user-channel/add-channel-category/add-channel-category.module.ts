import {Module} from "@nestjs/common";
import {ADD_CHANNEL_CATEGORY} from "../../../pages.types";
import {CategoryRepositoryModule} from "../../../../../repository/category/category.repository.module";
import {ChannelServiceClient} from "../../../../../client/channel-service/channer-service.client";
import {CategoryRepositoryInterface} from "../../../../../repository/category/category.repository.interface";
import {AddChannelCategory} from "./add-channel-category";

@Module(
    {
        imports : [CategoryRepositoryModule],
        providers : [
            AddChannelCategory
        ],

    }
)
export class AddChannelCategoryModule {

}
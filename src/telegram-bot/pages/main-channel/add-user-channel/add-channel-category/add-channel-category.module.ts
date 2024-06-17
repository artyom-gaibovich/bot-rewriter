import {Module} from "@nestjs/common";
import {CategoryRepositoryModule} from "../../../../../repository/category/category.repository.module";
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
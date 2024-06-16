import {Module} from "@nestjs/common";
import {ADD_CHANNEL_CATEGORY} from "../../../pages.types";

@Module(
    {
        providers : [
            {
                provide : ADD_CHANNEL_CATEGORY,
                useFactory : () => {}
            }
        ],
        exports : [ADD_CHANNEL_CATEGORY]
    }
)
export class AddChannelCategoryModule {

}
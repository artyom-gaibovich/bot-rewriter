import {Module} from "@nestjs/common";
import {CategoryRepository} from "./category.repository";
import {ChannelServiceClient} from "../../client/channel-service/channer-service.client";

@Module({
    providers : [

        {
            provide : 'CATEGORY_REPOSITORY',
            useFactory : () => {
                return new CategoryRepository(
                    {link : 'http://localhost:8080/api/v1/channel/add'},
                    new ChannelServiceClient())
            }
        },
    ],
    exports :  ['CATEGORY_REPOSITORY']
})
export class CategoryRepositoryModule {

}
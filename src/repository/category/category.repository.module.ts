import {Module} from "@nestjs/common";
import {CategoryRepository} from "./category.repository";
import {CATEGORY_REPOSITORY, CATEGORY_REPOSITORY_LINK_CONFIG, STORAGE_CLIENT} from "../../constants/DI.constants";
import {StorageClientModule} from "../../client/storage/storage.client.module";
import {CategoryRepositoryLinkConfig} from "./category.repository.link.config";
import {StorageClientInterface} from "../../client/storage/storage.client.interface";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {GET_CATEGORIES_URL} from "../../constants/enviroment.constants";

@Module({
    imports : [StorageClientModule, ConfigModule],
    providers : [
        {
            provide : CATEGORY_REPOSITORY_LINK_CONFIG,
            useFactory : (config  : ConfigService) => {
                return {
                    findAll : {link : config.get(GET_CATEGORIES_URL)}
                } as CategoryRepositoryLinkConfig
            }
        },
        {
            provide : CATEGORY_REPOSITORY,
            useFactory : (config : CategoryRepositoryLinkConfig, client : StorageClientInterface) => {
                return new CategoryRepository(config, client)
            },
            inject : [CATEGORY_REPOSITORY_LINK_CONFIG, STORAGE_CLIENT]
        },
    ],
    exports :  [CATEGORY_REPOSITORY]
})
export class CategoryRepositoryModule {

}
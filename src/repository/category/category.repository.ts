import {CategoryRepositoryInterface} from "./category.repository.interface";
import {StorageClientInterface} from "../../client/storage/storage.client.interface";
import {LinkInterface} from "../../model/link/link.interface";
import {CategoryRepositoryLinkConfig} from "./category.repository.link.config";
import {Inject, Injectable} from "@nestjs/common";
import {CATEGORY_REPOSITORY_LINK_CONFIG, STORAGE_CLIENT} from "../../constants/DI.constants";
@Injectable()
export class CategoryRepository implements CategoryRepositoryInterface {

    constructor(
        @Inject(CATEGORY_REPOSITORY_LINK_CONFIG) private config : CategoryRepositoryLinkConfig,
        @Inject(STORAGE_CLIENT) private client : StorageClientInterface
    ) {
    }
    async findAll(): Promise<CategoryInterface[]> {

        return (await this.client.getCategories({
            url: this.config.findAll
        })).categories
    }
}
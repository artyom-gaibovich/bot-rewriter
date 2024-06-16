import {CategoryRepositoryInterface} from "./category.repository.interface";
import {ChannelServiceClientInterface} from "../../client/channel-service/channel-service.client.interface";
import {LinkInterface} from "../../model/link/link.interface";

export class CategoryRepository implements CategoryRepositoryInterface {

    constructor(
        private link : LinkInterface,
        private clientChannel : ChannelServiceClientInterface
    ) {
    }
    async findAll(): Promise<CategoriesInterface> {
        const result = (await this.clientChannel.getCategories({
            url : this.link
        })).categories
        
        return {
            categories :  result
        }
    }
}
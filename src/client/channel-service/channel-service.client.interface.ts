
//http://localhost:8080/api/v1/user/create
//http://localhost:8080/api/v1/channel/add
//http://localhost:8080/api/v1/user/delete
//http://localhost:8080/api/v1/channel/delete
//http://localhost:8080/api/v1/channel/delete/channel-to-rewrite
//http://localhost:8080/api/v1/user/get
import {CreateUserRequestInterface} from "./req/create-user-request.interface";
import {CreateUserResponseInterface} from "./res/create-user-response.interface";
import {GetUserRequestInterface} from "./req/get-user-request.interface";
import {GetUserResponseInterface} from "./res/get-user.response.interface";
import {DeleteUserResponseInterface} from "./res/delete-user-response.interface";
import {AddChannelRequestInterface} from "./req/add-channel-request.interface";
import {DeleteUserRequestInterface} from "./req/delete-user-request.interface";
import {AddChannelResponseInterface} from "./res/add-channel-response.interface";
import {DeleteChannelRequestInterface} from "./req/delete-channel-request.interface";
import {DeleteChannelResponseInterface} from "./res/delete-channel-response.interface";
import {GetCategoriesRequestInterface} from "./req/get-categories.request.interface";

export interface ChannelServiceClientInterface {
    getCategories(req : GetCategoriesRequestInterface) : Promise<GetCategoriesResponseInterface>
    createUser(req: CreateUserRequestInterface) : Promise<CreateUserResponseInterface>
    getUser(req : GetUserRequestInterface) : Promise<GetUserResponseInterface>
    deleteUser(req : DeleteUserRequestInterface) : Promise<DeleteUserResponseInterface>
    addChannel(req : AddChannelRequestInterface) : Promise<AddChannelResponseInterface>
    deleteChannel(req : DeleteChannelRequestInterface) : Promise<DeleteUserResponseInterface>
    deleteChannelToRewrite(req: DeleteChannelRequestInterface) : Promise<DeleteChannelResponseInterface>
}


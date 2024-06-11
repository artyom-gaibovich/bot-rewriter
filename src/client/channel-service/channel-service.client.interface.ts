
//http://localhost:8080/api/v1/user/create
//http://localhost:8080/api/v1/channel/add
//http://localhost:8080/api/v1/user/delete
//http://localhost:8080/api/v1/channel/delete
//http://localhost:8080/api/v1/channel/delete/channel-to-rewrite
//http://localhost:8080/api/v1/user/get
import {CreateUserRequestInterface} from "./model/req/create-user-request.interface";
import {CreateUserResponseInterface} from "./model/res/create-user-response.interface";
import {GetUserRequestInterface} from "./model/req/get-user-request.interface";
import {GetUserResponseInterface} from "./model/res/get-user.response.interface";
import {DeleteUserResponseInterface} from "./model/res/delete-user-response.interface";
import {AddChannelRequestInterface} from "./model/req/add-channel-request.interface";
import {DeleteUserRequestInterface} from "./model/req/delete-user-request.interface";
import {AddChannelResponseInterface} from "./model/res/add-channel-response.interface";
import {DeleteChannelRequestInterface} from "./model/req/delete-channel-request.interface";
import {DeleteChannelResponseInterface} from "./model/res/delete-channel-response.interface";

export interface ChannelServiceClientInterface {
    createUser(req: CreateUserRequestInterface) : Promise<CreateUserResponseInterface>
    getUser(req : GetUserRequestInterface) : Promise<GetUserResponseInterface>
    deleteUser(req : DeleteUserRequestInterface) : Promise<DeleteUserResponseInterface>
    addChannel(req : AddChannelRequestInterface) : Promise<AddChannelResponseInterface>
    deleteChannel(req : DeleteChannelRequestInterface) : Promise<DeleteUserResponseInterface>
    deleteChannelToRewrite(req: DeleteChannelRequestInterface) : Promise<DeleteChannelResponseInterface>
}


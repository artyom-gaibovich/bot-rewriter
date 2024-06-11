import {ChannelServiceClientInterface} from "./channel-service.client.interface";
import {GetUserRequestInterface} from "./model/req/get-user-request.interface";
import {GetUserResponseInterface} from "./model/res/get-user.response.interface";
import axios from "axios";
import {CreateUserRequestInterface} from "./model/req/create-user-request.interface";
import {CreateUserResponseInterface} from "./model/res/create-user-response.interface";
import {DeleteUserRequestInterface} from "./model/req/delete-user-request.interface";
import {DeleteUserResponseInterface} from "./model/res/delete-user-response.interface";
import {AddChannelRequestInterface} from "./model/req/add-channel-request.interface";
import {AddChannelResponseInterface} from "./model/res/add-channel-response.interface";
import {DeleteChannelRequestInterface} from "./model/req/delete-channel-request.interface";
import {DeleteChannelResponseInterface} from "./model/res/delete-channel-response.interface";
import {UserInterface} from "../../model/user.interface";

export class ChannelServiceClient implements ChannelServiceClientInterface {
    async getUser(req: GetUserRequestInterface): Promise<GetUserResponseInterface> {
        try {
            const request = await axios.post<UserInterface>(req.url.link, req.body);
            return {
                body : request.data
            }
        } catch (error) {
            return {
                body : false
            }
        }
    }

    async createUser(req: CreateUserRequestInterface): Promise<CreateUserResponseInterface> {
        const request = await axios.post<CreateUserResponseInterface>(req.url.link, req.body)
        return request.data
    }
    async deleteUser(req: DeleteUserRequestInterface): Promise<DeleteUserResponseInterface> {
        const request = await axios.post<DeleteUserResponseInterface>(req.url.link, req.body)
        return request.data
    }

    async addChannel(req: AddChannelRequestInterface): Promise<AddChannelResponseInterface> {
        const request = await axios.post<AddChannelResponseInterface>(req.url.link, req.body)
        return request.data
    }

    async deleteChannel(req: DeleteChannelRequestInterface): Promise<DeleteUserResponseInterface> {
        const request = await axios.post<DeleteUserResponseInterface>(req.url.link, req.body)
        return request.data
    }
    async deleteChannelToRewrite(req: DeleteChannelRequestInterface): Promise<DeleteChannelResponseInterface> {
        const request = await axios.post<DeleteChannelResponseInterface>(req.url.link, req.body)
        return request.data
    }
}
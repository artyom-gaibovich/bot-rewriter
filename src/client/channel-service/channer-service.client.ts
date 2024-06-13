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
    async deleteUser(req: DeleteUserRequestInterface): Promise<DeleteUserResponseInterface> {
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

    async addChannel(req: AddChannelRequestInterface): Promise<AddChannelResponseInterface> {
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

    async deleteChannel(req: DeleteChannelRequestInterface): Promise<DeleteUserResponseInterface> {
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

    async deleteChannelToRewrite(req: DeleteChannelRequestInterface): Promise<DeleteChannelResponseInterface> {
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
}
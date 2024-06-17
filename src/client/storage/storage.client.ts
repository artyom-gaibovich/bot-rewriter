import {StorageClientInterface} from "./storage.client.interface";
import {GetUserRequestInterface} from "./req/get-user-request.interface";
import {GetUserResponseInterface} from "./res/get-user.response.interface";
import axios from "axios";
import {CreateUserRequestInterface} from "./req/create-user-request.interface";
import {CreateUserResponseInterface} from "./res/create-user-response.interface";
import {DeleteUserRequestInterface} from "./req/delete-user-request.interface";
import {DeleteUserResponseInterface} from "./res/delete-user-response.interface";
import {AddChannelRequestInterface} from "./req/add-channel-request.interface";
import {AddChannelResponseInterface} from "./res/add-channel-response.interface";
import {DeleteChannelRequestInterface} from "./req/delete-channel-request.interface";
import {DeleteChannelResponseInterface} from "./res/delete-channel-response.interface";
import {UserInterface} from "../../model/user.interface";
import {GetCategoriesRequestInterface} from "./req/get-categories.request.interface";
import {mockCategories} from "./mock/categories.mock";

export class StorageClient implements StorageClientInterface {

    //ДЕКОМПОЗИРОВАТЬ НА BASE RESPONSE ИНТЕРФЕЙС
    async getCategories(req: GetCategoriesRequestInterface): Promise<GetCategoriesResponseInterface> {
        try {

            return {
                status : 'OK',
                categories : mockCategories
            }
        }
        catch (error) {
            return {
                status : 'ERROR'
            }
        }
    }

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
            console.log(req)
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
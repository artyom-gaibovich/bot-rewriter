import {SendToCheckChannelsActionInterface} from "./send-to-check-channels.action.interface";
import {AddChannelsRequestModel} from "../model/request/add-channels.request.model";
import axios, {AxiosResponse} from "axios";
import {SendToCheckChannelsConfig} from "../config/send-to-check-channels.config";
import {Injectable, Module} from "@nestjs/common";


@Injectable()
export class SendToCheckChannelsAction implements SendToCheckChannelsActionInterface {
    constructor(private readonly config : SendToCheckChannelsConfig) {
    }
    async send(channels: AddChannelsRequestModel): Promise<AddChannelsResponseModel> {
        const response : AxiosResponse = await axios.post<AddChannelsResponseModel>(this.config.get().link, channels)
        return response.data as AddChannelsResponseModel
    }
}
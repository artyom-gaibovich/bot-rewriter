import {SendToCheckChannelsActionInterface} from "./send-to-check-channels.action.interface";
import {AddChannelsRequestModel} from "../../model/request/add-channels.request.model";
import axios, {AxiosResponse} from "axios";
import {Injectable} from "@nestjs/common";
import {SendToCheckChannelsActionConfig} from "./send-to-check-channels.action.config";


@Injectable()
export class SendToCheckChannelsAction implements SendToCheckChannelsActionInterface {
    constructor(private readonly config : SendToCheckChannelsActionConfig) {
    }
    async send(channels: AddChannelsRequestModel): Promise<AddChannelsResponseModel> {
        const response : AxiosResponse = await axios.post<AddChannelsResponseModel>(this.config.get().link, channels)
        console.log(response.data)
        return response.data as AddChannelsResponseModel
    }
}
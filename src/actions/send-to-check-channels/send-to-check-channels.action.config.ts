import {LinkModel} from "../../model/link/link.model";
import {Injectable} from "@nestjs/common";

@Injectable()
export class SendToCheckChannelsActionConfig {
    constructor(private readonly link : LinkModel) {
    }
    get() : LinkModel {
        return this.link
    }
}
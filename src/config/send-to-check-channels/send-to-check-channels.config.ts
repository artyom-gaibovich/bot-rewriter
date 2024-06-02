import {LinkModel} from "../../model/link.model";
import {Inject, Injectable, Module} from "@nestjs/common";


@Injectable()
export class SendToCheckChannelsConfig {
    constructor(private readonly link : LinkModel) { {
    }
    }
    get() {
        return this.link
    }
}
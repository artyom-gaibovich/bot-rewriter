import {LinkModel} from "../model/link.model";
import {Inject, Injectable, Module} from "@nestjs/common";

@Module({
    providers: [
        {
            provide: 'LINK_MODEL',
            useValue : {
                link : 'http://localhost:4000/channels/check'
            } as LinkModel
        }
    ],
    exports: [SendToCheckChannelsConfig]
})
@Injectable()
export class SendToCheckChannelsConfig {
    constructor(@Inject('LINK_MODEL')private readonly link : LinkModel) { {}
    }
    get() {
        return this.link
    }
}
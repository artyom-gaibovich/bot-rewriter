import {ChannelManagerInterface} from "./channel.manager.interface";

export class ChannelManager implements ChannelManagerInterface {
    create() {
    }
    delete(id : number) {
        console.log('Канал был успешно')
    }
}
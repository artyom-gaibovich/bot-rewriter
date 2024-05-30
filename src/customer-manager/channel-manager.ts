import {injectable} from "inversify";
import {ChannelManagerInterface} from "./channel-manager.interface";

@injectable()
export class ChannelManager implements ChannelManagerInterface{
    addChannels(channels : number[]) : number {
        return channels.reduce((acc, el) => {
            return acc + el
        })
    }
}
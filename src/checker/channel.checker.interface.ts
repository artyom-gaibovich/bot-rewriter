import {LinkModel} from "../model/link/link.model";

export interface ChannelCheckerInterface {
    checkByLinks(links : LinkModel[]) : Promise<CheckedChannelsModel>
}
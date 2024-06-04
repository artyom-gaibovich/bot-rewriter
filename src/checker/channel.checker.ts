import {ChannelCheckerInterface} from "./channel.checker.interface";
import {LinkModel} from "../model/link/link.model";
import {ContentAgencyClientInterface} from "../client/content-agency.client.interface";

export class ChannelChecker implements ChannelCheckerInterface {

    constructor(private url : LinkModel, private client : ContentAgencyClientInterface ) {
    }
    async checkByLinks(links: LinkModel[]): Promise<CheckedChannelsModel> {
        const response = await this.client.checkChannels({
            url : this.url,
            body : {
                links : links
            }
        })
        return {
            checkedChannels : response.checkedChannels.map(chn => {
                return {
                    channelLink : chn.channelLink,
                    isChannelExists : chn.isChannelExists
                }
            })
        }
    }
}
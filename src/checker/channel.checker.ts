import { ChannelCheckerInterface } from './channel.checker.interface';
import { LinkInterface } from '../model/link/link.interface';
import { ContentAgencyClientInterface } from '../client/content-agency/content-agency.client.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelChecker implements ChannelCheckerInterface {
	constructor(private url: LinkInterface, private client: ContentAgencyClientInterface) {}

	async checkByLinks(links: LinkInterface[]): Promise<CheckedChannelsModel> {
		const response = await this.client.checkChannels({
			url: this.url,
			body: {
				links: links,
			},
		});
		return {
			checkedChannels: response.checkedChannels.map((chn) => {
				return {
					channelLink: chn.channelLink,
					isChannelExists: chn.isChannelExists,
				};
			}),
		};
	}
}

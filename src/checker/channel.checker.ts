import { ChannelCheckerInterface } from './channel.checker.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ChannelServiceInterface } from '../client/storage/channel/channel.service.interface';
import { DIConstants } from '../constants/DI.constants';

@Injectable()
export class ChannelChecker implements ChannelCheckerInterface {
	constructor(
		@Inject(DIConstants.ChannelService) private channelService: ChannelServiceInterface,
	) {}

	async check(channels: { link: string }[]): Promise<{
		checkedChannels: {
			channelLink: string;
			isChannelExists: boolean;
		}[];
	}> {
		const { checkedChannels } = await this.channelService.check({
			links: channels,
		});
		return {
			checkedChannels: checkedChannels.map((chn) => {
				return {
					channelLink: chn.channelLink,
					isChannelExists: chn.isChannelExists,
				};
			}),
		};
	}
}

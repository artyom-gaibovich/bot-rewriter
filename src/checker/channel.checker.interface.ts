import { LinkInterface } from '../model/link/link.interface';

export interface ChannelCheckerInterface {
	checkByLinks(links: LinkInterface[]): Promise<CheckedChannelsModel>;
}

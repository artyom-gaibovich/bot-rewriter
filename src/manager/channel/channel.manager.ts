import { ChannelManagerInterface } from './channel.manager.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UserManagerLinkConfig } from '../user/user.manager.link.config';
import { UserInterface } from '../../model/user.interface';
import { ChannelManagerLinkConfig } from './channel.manager.link.config';
import { StorageClientInterfaceOld } from '../../client/storage/storage.client.interface.old';
import {
	CHANNEL_MANAGER,
	CHANNEL_MANAGER_LINK_CONFIG,
	STORAGE_CLIENT,
} from '../../constants/DI.constants';

@Injectable()
export class ChannelManager implements ChannelManagerInterface {
	constructor(
		@Inject(CHANNEL_MANAGER_LINK_CONFIG) private linkConfig: ChannelManagerLinkConfig,
		@Inject(STORAGE_CLIENT) private client: StorageClientInterfaceOld,
	) {}

	async addChannel(user: UserInterface): Promise<UserInterface> {
		const result = await this.client.addChannel({
			url: this.linkConfig.addChannel,
			body: user,
		});
		return result.body as UserInterface;
	}

	async deleteChannel(user: UserInterface): Promise<UserInterface> {
		return (
			await this.client.deleteChannel({
				url: this.linkConfig.deleteChannel,
				body: user,
			})
		).body as UserInterface;
	}

	async deleteChannelToRewrite(user: UserInterface): Promise<UserInterface> {
		return (
			await this.client.deleteChannelToRewrite({
				url: this.linkConfig.deleteChannelToRewrite,
				body: user,
			})
		).body as UserInterface;
	}
}

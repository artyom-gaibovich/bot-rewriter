import { ChannelManagerInterface } from './channel.manager.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DIConstants } from '../../constants/DI.constants';
import { ChannelServiceInterface } from '../../client/storage/channel/channel.service.interface';
import { User } from '../../client/storage/storage.model';

@Injectable()
export class ChannelManager implements ChannelManagerInterface {
	constructor(
		@Inject(DIConstants.ChannelService) private channelService: ChannelServiceInterface,
	) {}

	async create(user: { user: User }): Promise<{ user: User }> {
		return this.channelService.create(user);
	}

	async delete(user: { user: User }): Promise<{ user: User }> {
		return this.channelService.delete(user);
	}

	async deleteSecondary(user: { user: User }): Promise<{ user: User }> {
		return this.channelService.deleteSecondary(user);
	}
}

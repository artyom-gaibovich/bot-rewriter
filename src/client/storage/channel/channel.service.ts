import { Inject, Injectable } from '@nestjs/common';
import { User } from '../storage.model';
import { ChannelServiceInterface } from './channel.service.interface';
import { DIConstants } from '../../../constants/DI.constants';

@Injectable()
export class ChannelService implements ChannelServiceInterface {
	constructor(@Inject(DIConstants.ChannelServiceConfig) private config) {}

	create(req: { user: User }): Promise<{ user: User }> {
		throw new Error('Method not implemented.');
	}

	delete(req: { user: User }): Promise<{ user: User }> {
		throw new Error('Method not implemented.');
	}
}

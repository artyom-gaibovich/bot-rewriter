import { UserChannelInterface, UserChannelsInterface } from '../../model/channel.interface';

export interface ChannelRepositoryInterface {
	findById(id: number): Promise<UserChannelsInterface>;

	findOne(id: number): Promise<UserChannelInterface>;
}

import { Module } from '@nestjs/common';
import { ChannelManagerModule } from '../../../../manager/channel/channel.manager.module';
import { DeleteUserChannel } from './delete-user-channel';

@Module({
	imports: [ChannelManagerModule],
	providers: [DeleteUserChannel],
})
export class DeleteUserChannelModule {}

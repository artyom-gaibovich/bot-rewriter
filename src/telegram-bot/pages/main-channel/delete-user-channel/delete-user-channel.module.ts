import { Module } from '@nestjs/common';
import { ChannelManagerModule } from '../../../../manager/channel/channel.manager.module';
import { DeleteUserChannel } from './delete-user-channel';
import { ChannelManagerInterface } from '../../../../manager/channel/channel.manager.interface';

@Module({
	imports: [ChannelManagerModule],
	providers: [DeleteUserChannel],
})
export class DeleteUserChannelModule {}

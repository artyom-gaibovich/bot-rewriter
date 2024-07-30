import { Module } from '@nestjs/common';
import { ChannelManagerModule } from '../../../../manager/channel/channel.manager.module';
import { DeleteUserChannel } from './delete-user-channel';
import { DIConstants } from '../../../../constants/DI.constants';
import { deleteUserChannelConfig } from '../../../../config/pages/delete-user-channel';

@Module({
	imports: [ChannelManagerModule],
	providers: [
		{
			provide: DIConstants.DeleteUserChannelConfig,
			useValue: deleteUserChannelConfig(),
		},
		{
			provide: DIConstants.DeleteUserChannel,
			useClass: DeleteUserChannel,
		},
	],
})
export class DeleteUserChannelModule {}

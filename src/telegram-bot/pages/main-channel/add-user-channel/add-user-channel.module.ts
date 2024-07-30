import { Module } from '@nestjs/common';
import { ChannelManagerModule } from '../../../../manager/channel/channel.manager.module';
import { ChannelCheckerModule } from '../../../../checker/channel.checker.module';
import { AddUserChannel } from './add-user-channel';
import { LinkValidatorModule } from '../../../../validator/link.validator.module';
import { AddChannelCategoryModule } from './add-channel-category/add-channel-category.module';
import { DIConstants } from '../../../../constants/DI.constants';
import { addUserChannelConfig } from './add-user-channel.config';

@Module({
	imports: [LinkValidatorModule, ChannelManagerModule],
	providers: [
		{
			provide: DIConstants.AddUserChannelConfig,
			useValue: addUserChannelConfig(),
		},
		{
			provide: DIConstants.AddUserChannel,
			useClass: AddUserChannel,
		},
	],
})
export class AddUserChannelModule {}

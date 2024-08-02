import { Module } from '@nestjs/common';
import { UserManagerModule } from '../../../manager/user/user.manager.module';
import { UserRepositoryModule } from '../../../repository/user/user.repository.module';
import { DIConstants } from '../../../constants/DI.constants';
import { MainChannel } from './main-channel';
import { MainChannelConfig, mainChannelConfig } from './main-channel.config';

@Module({
	imports: [UserManagerModule, UserRepositoryModule],
	providers: [
		{
			provide: DIConstants.MainChannelConfig,
			useFactory: (): MainChannelConfig => mainChannelConfig(),
			inject: [],
		},
		{
			provide: DIConstants.MainChannel,
			useClass: MainChannel,
		},
	],
})
export class MainChannelModule {}

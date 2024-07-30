import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomLoggerModule } from '../../../logger/custom-logger.module';
import { DIConstants } from '../../../constants/DI.constants';
import { CustomLoggerService } from '../../../logger/custom-logger.service';
import { channelServiceConfig } from '../../../config/channel.service.config';
import { UserService } from './user.service';

@Module({
	imports: [ConfigModule, CustomLoggerModule],
	providers: [
		{
			provide: DIConstants.UserServiceConfig,
			useFactory: (configService: ConfigService, logger: CustomLoggerService) =>
				channelServiceConfig(configService, logger),
			inject: [ConfigService, CustomLoggerService],
		},
		{
			provide: DIConstants.UserService,
			useClass: UserService,
		},
	],
	exports: [DIConstants.UserService],
})
export class UserServiceModule {}

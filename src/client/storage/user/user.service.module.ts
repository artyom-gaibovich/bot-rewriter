import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomLoggerModule } from '../../../logger/custom-logger.module';
import { DIConstants } from '../../../constants/DI.constants';
import { CustomLoggerService } from '../../../logger/custom-logger.service';
import { UserService } from './user.service';
import { userServiceConfig } from './user.service.config';

@Module({
	imports: [ConfigModule, CustomLoggerModule],
	providers: [
		{
			provide: DIConstants.UserServiceConfig,
			useFactory: (configService: ConfigService, logger: CustomLoggerService) =>
				userServiceConfig(configService, logger),
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

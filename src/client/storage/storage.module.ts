import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DIConstants } from '../../constants/DI.constants';
import { userServiceConfig } from '../../config/user.service.config';
import { categoryServiceConfig } from '../../config/category.service.config';
import { channelServiceConfig } from '../../config/channel.service.config';
import { UserService } from './user/user.service';
import { ChannelService } from './channel/channel.service';
import { CategoryService } from './category/category.service';
import { CustomLoggerModule } from '../../logger/custom-logger.module';
import { CustomLoggerService } from '../../logger/custom-logger.service';
import { CustomLoggerInterface } from '../../logger/custom-logger.interface';

@Module({})
export class StorageModule {
	static forRoot(): DynamicModule {
		return {
			imports: [ConfigModule, CustomLoggerModule],
			module: StorageModule,
			providers: [
				{
					provide: DIConstants.UserServiceConfig,
					useFactory: (configService: ConfigService, logger: CustomLoggerInterface) =>
						userServiceConfig(configService, logger),
					inject: [ConfigService, CustomLoggerService],
				},
				{
					provide: DIConstants.ChannelServiceConfig,
					useFactory: (configService: ConfigService, logger: CustomLoggerInterface) =>
						channelServiceConfig(configService, logger),
					inject: [ConfigService, CustomLoggerService],
				},
				{
					provide: DIConstants.CategoryServiceConfig,
					useFactory: (configService: ConfigService, logger: CustomLoggerService) =>
						categoryServiceConfig(configService, logger),
					inject: [ConfigService, CustomLoggerService],
				},
				{
					provide: DIConstants.UserService,
					useClass: UserService,
				},
				{
					provide: DIConstants.ChannelService,
					useClass: ChannelService,
				},
				{
					provide: DIConstants.CategoryService,
					useClass: CategoryService,
				},
			],
		};
	}
}

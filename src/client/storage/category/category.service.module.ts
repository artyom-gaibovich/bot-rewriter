import { DynamicModule, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomLoggerModule } from '../../../logger/custom-logger.module';
import { DIConstants } from '../../../constants/DI.constants';
import { CustomLoggerService } from '../../../logger/custom-logger.service';
import { channelServiceConfig } from '../../../config/channel.service.config';

@Module({
	imports: [ConfigModule, CustomLoggerModule],
	providers: [
		{
			provide: DIConstants.CategoryServiceConfig,
			useFactory: (configService: ConfigService, logger: CustomLoggerService) =>
				channelServiceConfig(configService, logger),
			inject: [ConfigService, CustomLoggerService],
		},
		{
			provide: DIConstants.CategoryService,
			useClass: CategoryService,
		},
	],
	exports: [DIConstants.CategoryService],
})
export class CategoryServiceModule {}

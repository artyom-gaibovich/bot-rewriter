import { Module } from '@nestjs/common';
import { DIConstants } from '../../../constants/DI.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomLoggerService } from '../../../logger/custom-logger.service';
import { channelServiceConfig } from '../../../config/channel.service.config';
import { CustomLoggerModule } from '../../../logger/custom-logger.module';
import { ChannelService } from './channel.service';

@Module({
	imports: [ConfigModule, CustomLoggerModule],
	providers: [
		{
			provide: DIConstants.ChannelServiceConfig,
			useFactory: (configService: ConfigService, logger: CustomLoggerService) =>
				channelServiceConfig(configService, logger),
			inject: [ConfigService, CustomLoggerService],
		},
		{
			provide: DIConstants.ChannelService,
			useClass: ChannelService,
		},
	],
	exports: [DIConstants.ChannelService],
})
export class ChannelServiceModule {}

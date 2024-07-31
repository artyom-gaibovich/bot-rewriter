import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomLoggerModule } from '../../../logger/custom-logger.module';
import { DIConstants } from '../../../constants/DI.constants';
import { CustomLoggerService } from '../../../logger/custom-logger.service';
import { channelServiceConfig } from '../channel/channel.service.config';
import { ChannelService } from '../channel/channel.service';
import { textServiceConfig } from './text.service.config';

@Module({
	imports: [ConfigModule, CustomLoggerModule],
	providers: [
		{
			provide: DIConstants.TextServiceConfig,
			useFactory: (configService: ConfigService, logger: CustomLoggerService) =>
				textServiceConfig(configService, logger),
			inject: [ConfigService, CustomLoggerService],
		},
		{
			provide: DIConstants.TextService,
			useClass: ChannelService,
		},
	],
	exports: [DIConstants.TextService],
})
export class TextServiceModule {}

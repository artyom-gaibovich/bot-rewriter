import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DIConstants } from '../constants/DI.constants';
import { CustomLoggerService } from '../logger/custom-logger.service';
import { TextRewriterConfig, textRewriterConfig } from './text.rewriter.config';
import { TextRewriter } from './text.rewriter';
import { TextServiceModule } from '../client/storage/text/text.service.module';
import { CustomLoggerModule } from '../logger/custom-logger.module';

@Module({
	imports: [TextServiceModule, ConfigModule, CustomLoggerModule],
	providers: [
		{
			provide: DIConstants.TextRewriterConfig,
			useFactory: (configService: ConfigService, logger: CustomLoggerService): TextRewriterConfig =>
				textRewriterConfig(configService, logger),
			inject: [ConfigService, CustomLoggerService],
		},
		{
			provide: DIConstants.TextRewriter,
			useClass: TextRewriter,
		},
	],
	exports: [DIConstants.TextRewriter],
})
export class TextRewriterModule {}

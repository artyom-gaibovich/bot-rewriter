import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DIConstants } from '../constants/DI.constants';
import { CustomLoggerService } from '../logger/custom-logger.service';
import { textRewriterConfig } from './text.rewriter.config';
import { TextRewriter } from './text.rewriter';
import { TextServiceModule } from '../client/storage/text/text.service.module';

@Module({
	imports: [TextServiceModule],
	providers: [
		{
			provide: DIConstants.TextRewriterConfig,
			useFactory: (configService: ConfigService, logger: CustomLoggerService) =>
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

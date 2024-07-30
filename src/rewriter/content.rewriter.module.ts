import { Module } from '@nestjs/common';
import { ContentRewriter } from './content.rewriter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContentRewriterConfig } from './content.rewriter.config';
import { ContentAgencyClientModule } from '../client/content-agency/content-agency.client.module';
import { ContentAgencyClientInterface } from '../client/content-agency/content-agency.client.interface';
import { UrlConstants } from '../constants/url.constants';
import { DIConstants } from '../constants/DI.constants';

@Module({
	imports: [ConfigModule, ContentAgencyClientModule],
	providers: [
		{
			provide: DIConstants.ContentRewriterLinkConfig,
			useFactory: (config: ConfigService) => {
				return {
					rewriteLink: {
						link: config.get(UrlConstants.ContentRewriterUrl),
					},
					limit: 3,
				} as ContentRewriterConfig;
			},
			inject: [ConfigService],
		},
		{
			provide: DIConstants.ContentRewriter,
			useFactory: (config: ContentRewriterConfig, client: ContentAgencyClientInterface) => {
				return new ContentRewriter(config, client);
			},
			inject: [DIConstants.ContentRewriterLinkConfig, DIConstants.ContentAgencyClient],
		},
	],
	exports: [DIConstants.ContentRewriter],
})
export class ContentRewriterModule {}

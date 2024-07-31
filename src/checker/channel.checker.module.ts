import { Module } from '@nestjs/common';
import { LinkInterface } from '../model/link/link.interface';
import { ContentAgencyClient } from '../client/content-agency/content-agency.client';
import { UpdateCategory } from '../rewriter/text.rewriter';
import { ChannelChecker } from './channel.checker';
import { ConfigService } from '@nestjs/config';

@Module({
	providers: [
		{
			provide: 'CUSTOM_CHANNEL_CHECKER',
			useFactory: (config: ConfigService) => {
				return new ChannelChecker(
					{ link: config.get('CHECK_CHANNELS_URL') },
					new ContentAgencyClient(),
				);
			},
			inject: [ConfigService],
		},
	],
	exports: [`CUSTOM_CHANNEL_CHECKER`],
})
export class ChannelCheckerModule {}

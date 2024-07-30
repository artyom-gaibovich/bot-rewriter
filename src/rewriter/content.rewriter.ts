import { ContentRewriterInterface } from './content.rewriter.interface';
import { ChannelsToRewriteModel } from './model/channels-to-rewrite.model';
import { RewrittenContentModel } from './model/rewritten-content.model';
import { ContentAgencyClientInterface } from '../client/content-agency/content-agency.client.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ContentRewriterConfig } from './content.rewriter.config';
import { PromptInterface } from '../model/prompt.interface';
import { DIConstants } from '../constants/DI.constants';

@Injectable()
export class ContentRewriter implements ContentRewriterInterface {
	constructor(
		@Inject(DIConstants.ContentRewriterLinkConfig) private config: ContentRewriterConfig,
		@Inject(DIConstants.ContentAgencyClient) private client: ContentAgencyClientInterface,
	) {}

	async rewrite(
		channelsToRewrite: ChannelsToRewriteModel,
		prompt: PromptInterface,
	): Promise<RewrittenContentModel> {
		const response = await this.client.rewriteContent({
			url: this.config.rewriteLink,
			body: {
				prompt: prompt.prompt,
				links: channelsToRewrite.channelsToRewrite,
				limit: this.config.limit, // вот тут задается лимит на посты.
			},
		});
		return {
			rewrittenContent: response.data,
		};
	}
}

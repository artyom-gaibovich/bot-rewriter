import { TextRewriterInterface } from './text.rewriter.interface';
import { Inject, Injectable } from '@nestjs/common';
import { TextRewriterConfig } from './text.rewriter.config';
import { DIConstants } from '../constants/DI.constants';
import { TextServiceInterface } from '../client/storage/text/text.service.interface';

@Injectable()
export class TextRewriter implements TextRewriterInterface {
	constructor(
		@Inject(DIConstants.TextRewriterConfig) private config: TextRewriterConfig,
		@Inject(DIConstants.TextService) private textService: TextServiceInterface,
	) {}

	async rewrite(
		channelsToRewrite: { channelsToRewrite: { link: string }[] },
		prompt: {
			prompt: string;
			text?: string;
		},
	): Promise<{ rewrittenContent: string }> {
		const data = await this.textService.rewrite({
			prompt: prompt.prompt,
			links: channelsToRewrite.channelsToRewrite,
			limit: this.config.limit,
		});
		return {
			rewrittenContent: '1',
		};
	}
}

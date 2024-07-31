export interface TextRewriterInterface {
	rewrite(
		channelsToRewrite: { channelsToRewrite: { link: string }[] },
		prompt: {
			prompt: string;
			text?: string;
		},
	): Promise<{ rewrittenContent: string }>;
}

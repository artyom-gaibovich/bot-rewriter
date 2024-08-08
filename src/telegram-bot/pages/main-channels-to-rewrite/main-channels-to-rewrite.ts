import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { TelegramContextModel } from '../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { ChannelLinkInterface } from '../../../model/link/channel.link.interface';
import { Inject } from '@nestjs/common';
import { DIConstants } from '../../../constants/DI.constants';
import { ChannelInterface, UserChannelInterface } from '../../../client/storage/storage.model';
import { MainChannelsToRewriteConfig } from './main-channels-to-rewrite.config';
import { TextRewriterInterface } from '../../../rewriter/text.rewriter.interface';
import { CategoryRepositoryInterface } from '../../../repository/category/category.repository.interface';
import { CategoryInterface } from '../../../client/storage/category/category.service.interface'; // Импортируем конфиг

export interface MainChannelsToRewriteSceneInterface extends Record<string, any> {
	foundUserChannel: UserChannelInterface;
	channelsToRewrite?: ChannelLinkInterface[] | any; // Необходимо типизировать
	generatedContent: string;
	currentCategory: CategoryInterface;
	currentPrompt: string;
}

export type MainChannelsToRewriteSceneContext = TelegramContextModel &
	StepContext<MainChannelsToRewriteSceneInterface>;

@Scene(DIConstants.MainChannelsToRewrite)
export class MainChannelsToRewrite {
	constructor(
		@Inject(DIConstants.TextRewriter) private textRewriter: TextRewriterInterface,
		@Inject(DIConstants.CategoryRepository) private categoryRepository: CategoryRepositoryInterface,
		@Inject(DIConstants.MainChannelsToRewriteConfig) private config: MainChannelsToRewriteConfig, // Внедряем конфиг
	) {}

	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: MainChannelsToRewriteSceneContext) {
		if (telegramContext.scene.step.firstTime) {
			const { foundUserChannel } = telegramContext.scene.state;
			telegramContext.scene.state.channelsToRewrite = foundUserChannel.channelsToRewrite;

			telegramContext.scene.state.currentCategory = [
				...(await this.categoryRepository.findAll()).categories,
			].find(
				(chn) => chn.value === (foundUserChannel.userChannel as ChannelInterface).category.value,
			);
		}
	}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: MainChannelsToRewriteSceneContext) {
		const foundUserChannel = telegramContext.scene.state.foundUserChannel;
		if (
			telegramContext.text === this.config.generateContent ||
			telegramContext.text === this.config.regenerateContent
		) {
			const prompt: {
				prompt: string;
				text?: string;
			} = {
				prompt: telegramContext.scene.state.currentCategory.prompt
					? telegramContext.scene.state.currentCategory.prompt
					: this.config.cancelMessage,
			};
			/*if (telegramContext.text === this.config.regenerateContent) {
				prompt.prompt = (foundUserChannel.userChannel as ChannelInterface).category.prompt;
			}*/

			await telegramContext.send(this.config.contentGenerationMessage, {
				reply_markup: {
					remove_keyboard: true,
				},
			});

			const rewrittenContent = await this.textRewriter.rewrite(
				{
					channelsToRewrite: telegramContext.scene.state.channelsToRewrite,
				},
				prompt,
			);
			await telegramContext.send(rewrittenContent.rewrittenContent);
			await telegramContext.send(this.config.contentGenerationSuccess);
			telegramContext.scene.state.generatedContent = rewrittenContent.rewrittenContent;
		}

		if (telegramContext.text === this.config.backButton) {
			return await telegramContext.scene.enter(DIConstants.MainChannel);
		}
		if (telegramContext.text === this.config.increaseLimitButton) {
			return await telegramContext.scene.enter(DIConstants.ImproveLimits, {
				state: {
					foundUserChannel: telegramContext.scene.state.foundUserChannel,
					flag: DIConstants.MainChannelToRewrite,
				},
			});
		}
		if (telegramContext.text === this.config.deleteChannelButton) {
			return telegramContext.scene.enter(DIConstants.DeleteUserChannel, {
				state: {
					userChannelToDelete: foundUserChannel,
				},
			});
		}
		if (telegramContext.text === this.config.addSubchannelButton) {
			return telegramContext.scene.enter(DIConstants.AddChannelToRewrite, {
				state: {
					foundUserChannel: foundUserChannel,
					channelsToRewrite: telegramContext.scene.state.channelsToRewrite,
				},
			});
		}
		if (
			telegramContext.text.startsWith(this.config.channelToRewritePrefix) &&
			telegramContext.scene.state.channelsToRewrite
				.map((chn) => chn.link)
				.includes(telegramContext.text.replace(this.config.channelToRewritePrefix, ''))
		) {
			const foundChannelToRewrite: ChannelLinkInterface =
				telegramContext.scene.state.channelsToRewrite.find(
					(chn) =>
						chn.link === telegramContext.text.replace(this.config.channelToRewritePrefix, ''),
				);

			return await telegramContext.scene.enter(DIConstants.MainChannelToRewrite, {
				state: {
					foundChannelToRewrite,
					foundUserChannel,
				},
			});
		}

		const channelsToRewrite = telegramContext.scene.state.channelsToRewrite;
		const channelsToRewriteCount = channelsToRewrite.length;
		const channelsToRewriteLimit = 5;

		const channelKeyboard = channelsToRewrite.map((chn) => [
			{ text: `${this.config.channelToRewritePrefix}${chn.link}` },
		]);

		const rewriteContentKeyboard = [
			[
				{
					text: telegramContext.scene.state.generatedContent
						? this.config.generateContent
						: this.config.generateContent,
				},
			],
		];
		const addChannelKeyboard = [[{ text: this.config.addSubchannelButton }]];
		const backKeyboard = [[{ text: this.config.backButton }]];
		const limitKeyboard = [[{ text: this.config.increaseLimitButton }]];
		const deleteChannelKeyboard = [[{ text: this.config.deleteChannelButton }]];
		let mainKeyboard = [];
		if (channelsToRewriteCount === channelsToRewriteLimit) {
			mainKeyboard = [...rewriteContentKeyboard, ...limitKeyboard, ...channelKeyboard];
		}
		if (channelsToRewriteCount > 0 && channelsToRewriteCount < channelsToRewriteLimit) {
			mainKeyboard = [...rewriteContentKeyboard, ...addChannelKeyboard, ...channelKeyboard];
		}
		if (channelsToRewriteCount === 0) {
			mainKeyboard = [...addChannelKeyboard];
		}

		return await telegramContext.send(this.config.requestActionMessage, {
			reply_markup: {
				resize_keyboard: true,
				remove_keyboard: true,
				keyboard: [...mainKeyboard, ...deleteChannelKeyboard, ...backKeyboard],
			},
		});
	}
}

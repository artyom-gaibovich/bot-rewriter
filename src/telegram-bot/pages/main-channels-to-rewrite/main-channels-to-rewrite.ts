import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { TelegramContextModel } from '../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { ChannelLinkInterface } from '../../../model/link/channel.link.interface';
import { Inject } from '@nestjs/common';
import { UpdateCategoryInterface } from '../../../rewriter/text.rewriter.interface';
import { DIConstants } from '../../../constants/DI.constants';
import { PromptInterface } from '../../../model/prompt.interface';
import { UserChannelInterface } from '../../../client/storage/storage.model';
import { MainChannelsToRewriteConfig } from './main-channels-to-rewrite.config'; // Импортируем конфиг

export interface MainChannelsToRewriteSceneInterface extends Record<string, any> {
	foundUserChannel: UserChannelInterface;
	channelsToRewrite?: ChannelLinkInterface[] | any; // Необходимо типизировать
	generatedContent: string;
	currentPrompt: string;
}

export type MainChannelsToRewriteSceneContext = TelegramContextModel &
	StepContext<MainChannelsToRewriteSceneInterface>;

@Scene(DIConstants.MainChannelToRewrite) // Обновляем декоратор
export class MainChannelsToRewrite {
	constructor(
		@Inject(DIConstants.UpdateCategory) private UpdateCategory: UpdateCategoryInterface,
		@Inject(DIConstants.MainChannelsToRewriteConfig) private config: MainChannelsToRewriteConfig, // Внедряем конфиг
	) {}

	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: MainChannelsToRewriteSceneContext) {
		if (telegramContext.scene.step.firstTime) {
			telegramContext.scene.state.channelsToRewrite =
				telegramContext.scene.state.foundUserChannel.channelsToRewrite;
		}
	}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: MainChannelsToRewriteSceneContext) {
		const foundUserChannel = telegramContext.scene.state.foundUserChannel;

		if (
			telegramContext.text === this.config.generateContent ||
			telegramContext.text === this.config.regenerateContent
		) {
			const prompt: PromptInterface = {
				prompt: telegramContext.scene.state.currentPrompt
					? telegramContext.scene.state.currentPrompt
					: this.config.cancelMessage,
			};
			if (telegramContext.text === this.config.regenerateContent) {
				prompt.prompt = telegramContext.scene.state.currentPrompt;
			}

			await telegramContext.send(this.config.contentGenerationMessage, {
				reply_markup: {
					remove_keyboard: true,
				},
			});

			try {
				const rewrittenContent = await this.UpdateCategory.rewrite(
					{
						channelsToRewrite: telegramContext.scene.state.channelsToRewrite,
					},
					prompt,
				);
				await telegramContext.send(rewrittenContent.rewrittenContent);
				await telegramContext.send(this.config.contentGenerationSuccess);
				telegramContext.scene.state.generatedContent = rewrittenContent.rewrittenContent;
			} catch (e) {
				await telegramContext.send(this.config.technicalIssuesMessage);
			}
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
			return telegramContext.scene.enter(DIConstants.MainChannelToRewrite, {
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
						? this.config.regenerateContent
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

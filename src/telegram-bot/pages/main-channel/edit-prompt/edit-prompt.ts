import { TelegramContextModel } from '../../../model/telegram-context-model';
import { StepContext } from '@puregram/scenes';
import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { EDIT_PROMPT, MAIN_CHANNEL_PAGE, MAIN_CHANNELS_TO_REWRITE_PAGE } from '../../pages.types';
import { CategoryInterface, UserChannelInterface } from '../../../../client/storage/storage.model';
import { Inject } from '@nestjs/common';
import { DIConstants } from '../../../../constants/DI.constants';
import { MainChannelConfig } from '../../../../config/pages/main-channel.config';
import { EditPromptConfig } from '../../../../config/pages/edit-prompt.config';

export interface EditPromptSceneInterface extends Record<string, any> {
	category: CategoryInterface;
	userChannels: UserChannelInterface[];
	currentPrompt: string;
}

export type EditPromptSceneContext = TelegramContextModel & StepContext<EditPromptSceneInterface>;

@Scene(DIConstants.EditPrompt)
export class EditPrompt {
	constructor(@Inject(DIConstants.EditPromptConfig) private config: EditPromptConfig) {}

	@SceneEnter()
	async sceneEnter(@Ctx() telegramContext: EditPromptSceneContext) {}

	@AddStep(0)
	async zeroStep(@Ctx() telegramContext: EditPromptSceneContext) {
		if (telegramContext.scene.step.firstTime) {
			return await telegramContext.send(this.config.sendPrompt, {
				reply_markup: {
					remove_keyboard: true,
					resize_keyboard: true,
					keyboard: [[{ text: this.config.comeBack }]],
				},
			});
		}
		if (telegramContext.text === this.config.comeBack) {
			return await telegramContext.scene.enter(MAIN_CHANNEL_PAGE);
		}

		await telegramContext.send(this.config.success, {
			reply_markup: {
				one_time_keyboard: true,
				remove_keyboard: true,
			},
		});
		return await telegramContext.scene.enter(MAIN_CHANNEL_PAGE, {
			state: {
				currentPrompt: telegramContext.text,
			},
		});
	}
}

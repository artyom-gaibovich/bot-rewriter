import { Module } from '@nestjs/common';
import { EditPrompt } from './edit-prompt';
import { DIConstants } from '../../../../constants/DI.constants';
import { EditPromptConfig, editPromptConfig } from '../../../../config/pages/edit-prompt.config';

@Module({
	imports: [EditPromptModule],
	providers: [
		{
			provide: DIConstants.EditPromptConfig,
			useFactory: (): EditPromptConfig => editPromptConfig(),
			inject: [],
		},
		{
			provide: DIConstants.EditPrompt,
			useClass: EditPrompt,
		},
	],
})
export class EditPromptModule {}

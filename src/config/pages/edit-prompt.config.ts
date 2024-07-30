export interface EditPromptConfig {
	addCategory: string;
	sendPrompt: string;
	comeBack: string;
	success: string;
}

export const editPromptConfig = (): EditPromptConfig => {
	return {
		addCategory: 'Добавить категорию',
		sendPrompt: 'Отправьте промпт',
		comeBack: 'Вернуться обратно',
		success: 'Промпт был успешно добавлен',
	};
};

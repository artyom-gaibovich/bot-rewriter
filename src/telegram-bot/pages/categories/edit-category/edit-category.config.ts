export interface EditCategoryConfig {
	deleteSubChannelMessage: string;
	backButton: string;
	deleteSubChannelButton: string;
	startMessage: string;
	errorMessage: string;

	errorParseNumber: string;
	promptMessage: string;
	valueMessage: string;
	sequenceMessage: string;
}

export const editCategoryConfig = (): EditCategoryConfig => {
	return {
		errorParseNumber: 'Это должно быть числом. Отправляй всё заново!',
		sequenceMessage: 'Отправьте [sequence]',
		deleteSubChannelMessage: '[Категория была удалёна.]',
		errorMessage: '[Произошла ошибка на сервере]',
		startMessage: '[Отправьте название категории]',
		promptMessage: '[Отправьте промпт для этой категории]',
		valueMessage: 'Отправьте [value], используйте английский алфовит.',
		backButton: '[Вернуться обратно]',
		deleteSubChannelButton: '[Удалить категорию]',
	};
};

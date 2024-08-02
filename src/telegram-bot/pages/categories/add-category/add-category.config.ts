export interface AddCategoryConfig {
	deleteSubChannelMessage: string;
	backButton: string;
	deleteSubChannelButton: string;
	startMessage: string;
	errorMessage: string;

	promptMessage: string;
	valueMessage: string;
}

export const addCategoryConfig = (): AddCategoryConfig => {
	return {
		deleteSubChannelMessage: 'Категория была удалёна.',
		errorMessage: 'Произошла ошибка на сервере.',
		startMessage: 'Отправьте название категории',
		promptMessage: 'Отправьте промпт для этой категории',
		valueMessage: 'Отправьте [value], используйте английский алфовит.',
		backButton: 'Обратно',
		deleteSubChannelButton: 'Удалить категорию',
	};
};

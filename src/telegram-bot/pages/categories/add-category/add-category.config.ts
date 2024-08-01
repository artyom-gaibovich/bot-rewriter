export interface AddCategoryConfig {
	deleteSubChannelMessage: string;
	backButton: string;
	deleteSubChannelButton: string;
	startMessage: string;
	errorMessage: string;
}

export const addCategoryConfig = (): AddCategoryConfig => {
	return {
		deleteSubChannelMessage: 'Категория была удалёна.',
		errorMessage: 'Произошла ошибка на сервере.',
		startMessage: 'Отправьте название категории',
		backButton: 'Обратно',
		deleteSubChannelButton: 'Удалить категорию',
	};
};

export interface AddChannelCategoryConfig {
	selectActionMessage: string;
	nextButton: string;
	backButton: string;
	exitButton: string;
	addCategoryButton: string;
}

export const addChannelCategoryConfig = (): AddChannelCategoryConfig => {
	return {
		selectActionMessage: 'Выберите дальнейшее действие',
		nextButton: 'Следующая',
		backButton: 'Назад',
		exitButton: 'Выйти',
		addCategoryButton: 'Добавить категорию',
	};
};

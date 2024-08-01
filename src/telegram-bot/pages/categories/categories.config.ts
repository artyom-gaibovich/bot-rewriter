export interface CategoriesConfig {
	startMessage: string;
	nextButton: string;
	backButton: string;
	exitButton: string;
	addCategoryButton: string;
	selectActionMessage: string;
}

export const categoriesConfig = (): CategoriesConfig => {
	return {
		startMessage: 'Выберите категорию, которую хотите отредактировать',
		nextButton: 'Следующая',
		backButton: 'Назад',
		exitButton: 'Выйти',
		addCategoryButton: 'Добавить категорию',
		selectActionMessage: 'Выберите дальнейшее действие',
	};
};

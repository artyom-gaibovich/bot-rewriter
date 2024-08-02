export interface CategoryConfig {
	requestLinkMessage: string;
	goBackButton: string;
	channelNotAddedError: string;
	channelAlreadyAddedError: string;
	invalidLinkError: string;
	successMessage: string;
	editCategory: string;
	error: string;
	deleteCategory: string;
}

export const categoryConfig = (): CategoryConfig => {
	return {
		error: 'Произошла ошибка на стороне сервера. Скоро поправим.',
		requestLinkMessage: 'Отправьте название категории',
		goBackButton: 'Вернуться обратно',
		channelNotAddedError: 'Канал не был добавлен, отправьте в корректном формате',
		channelAlreadyAddedError: 'Вы уже добавили этот канал',
		invalidLinkError: 'Канал не был добавлен, отправьте в корректном формате',
		successMessage: 'Категория была успешно добавлен!',
		editCategory: 'Редактировать',
		deleteCategory: 'Удалить',
	};
};

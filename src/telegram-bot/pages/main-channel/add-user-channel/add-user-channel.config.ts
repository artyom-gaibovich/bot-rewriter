export interface AddUserChannelConfig {
	requestLinkMessage: string;
	goBackButton: string;
	channelNotAddedError: string;
	channelAlreadyAddedError: string;
	invalidLinkError: string;
	successMessage: string;
	error: string;
}

export const addUserChannelConfig = (): AddUserChannelConfig => {
	return {
		error: 'Произошла ошибка на стороне сервера. Скоро поправим.',
		requestLinkMessage: 'Отправьте ссылку на ваш телеграм канал',
		goBackButton: 'Вернуться обратно',
		channelNotAddedError: 'Канал не был добавлен, отправьте в корректном формате',
		channelAlreadyAddedError: 'Вы уже добавили этот канал',
		invalidLinkError: 'Канал не был добавлен, отправьте в корректном формате',
		successMessage: 'Канал был успешно добавлен!',
	};
};

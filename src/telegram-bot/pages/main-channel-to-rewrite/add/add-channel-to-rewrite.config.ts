export interface AddChannelToRewriteConfig {
	requestLinkMessage: string;
	cancelButton: string;
	alreadyAddedMessage: string;
	notAddedMessage: string;
}

export const addChannelToRewriteConfig = (): AddChannelToRewriteConfig => {
	return {
		requestLinkMessage: 'Отправьте ссылку на телеграм канал, откуда будем переписывать контент',
		cancelButton: 'Отменить',
		alreadyAddedMessage: 'Этот подканал уже был добавлен',
		notAddedMessage:
			'Подканал не был добавлен. Либо он не существует, либо вы отправили некорректную ссылку.',
	};
};

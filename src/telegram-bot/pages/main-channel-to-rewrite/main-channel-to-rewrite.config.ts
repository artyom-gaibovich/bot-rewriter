export interface MainChannelToRewriteConfig {
	initialMessage: string;
	deleteSubChannelMessage: string;
	backButton: string;
	deleteSubChannelButton: string;
}

export const mainChannelToRewriteConfig = (): MainChannelToRewriteConfig => {
	return {
		initialMessage: `Ваш текущий канал для переписывания ${'${foundChannelToRewrite.link}'}. Если хотите его изменить, отправьте новую ссылку.`,
		deleteSubChannelMessage: 'Подканал был удалён.',
		backButton: 'Обратно',
		deleteSubChannelButton: 'Удалить подканал',
	};
};

// main-channels-to-rewrite.config.ts
export interface MainChannelsToRewriteConfig {
	requestActionMessage: string;
	generateContent: string;
	regenerateContent: string;
	backButton: string;
	increaseLimitButton: string;
	deleteChannelButton: string;
	addSubchannelButton: string;
	channelToRewritePrefix: string;
	contentGenerationMessage: string;
	contentGenerationSuccess: string;
	technicalIssuesMessage: string;
	cancelMessage: string;
}

export const mainChannelsToRewriteConfig = (): MainChannelsToRewriteConfig => {
	return {
		requestActionMessage: 'Выберите дальнейшее действие',
		generateContent: 'Генерировать контент',
		regenerateContent: 'Перегенерировать контент',
		backButton: 'Назад',
		increaseLimitButton: 'Повысить лимит',
		deleteChannelButton: 'Удалить канал',
		addSubchannelButton: 'Добавить подканал',
		channelToRewritePrefix: '🔷 ',
		contentGenerationMessage: 'Контент генерируется, ожидайте...',
		contentGenerationSuccess: 'Контент был успешно сгенерирован',
		technicalIssuesMessage: 'Ведутся технические работы.',
		cancelMessage:
			'ОТМЕНИ ВСЁ НЕ ДЕЛАЙ НИЧЕГО. ОТПРАВЬ МНЕ СООБЩЕНИЕ О ТОМ, ЧТО ПРОМПТ НЕ ЗАДАН!!!',
	};
};

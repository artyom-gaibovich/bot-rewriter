export interface AddChannelsPromoConfig {
	welcomeMessage: string;
	startButton: string;
	supportButton: string;
	backButton: string;
}

export const addChannelsPromoConfig = (): AddChannelsPromoConfig => {
	return {
		welcomeMessage: `😎 Код введён верно! Приступим к генерации контента? 

Добавьте свои основные каналы для которых будет генерироваться контент и дополнительные каналы с которых будет парситься материал для генерации. 

Если вы запутались и не понимаете что делать — напишите в поддержку или посмотрите наш видео-туториал.`,
		startButton: 'Начинаем!',
		supportButton: 'Техподдержка',
		backButton: 'Вернуться назад',
	};
};

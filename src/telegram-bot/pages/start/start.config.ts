export interface StartConfig {
	initialMessage: string;
	proceedButton: string;
	improveLimitsButton: string;
	backButton: string;
	activateCode: string;
}

export const startConfig = (): StartConfig => {
	return {
		activateCode: 'admin',
		initialMessage:
			'😎 Код введён верно! Приступим к генерации контента? \n' +
			'\n' +
			'Добавляется свои основные каналы для которых будет генерироваться контент и дополнительные каналы с которых будет парситься материал для генерации. Если вы запутались и не понимаете что делать — напишите в поддержку или посмотрите наш видео-туториал',
		proceedButton: 'Хорошо, поехали!',
		improveLimitsButton: 'Повысить лимиты',
		backButton: 'Выберите дальнейшее действие',
	};
};

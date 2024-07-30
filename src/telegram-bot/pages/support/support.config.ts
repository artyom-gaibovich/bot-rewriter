export interface SupportConfig {
	initialMessage: string;
	backButton: string;
	unknownFlag: string;
}

export const supportConfig = (): SupportConfig => {
	return {
		initialMessage: 'Что-то пошло не так? Мы на связи 24/7😎 @example',
		backButton: 'Вернуться обратно',
		unknownFlag: 'Неизвестный флаг',
	};
};

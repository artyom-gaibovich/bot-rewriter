export interface ImproveLimitsConfig {
	currentPlanMessage: string;
	subscribeLink: string;
	backButton: string;
	returnBackButton: string;
}

export const improveLimitsConfig = (): ImproveLimitsConfig => {
	return {
		currentPlanMessage:
			'Ваш текущий тарифный план : Базовый. Если хотите его повысить, перейдите по ссылке',
		subscribeLink: 'https://localhost:/api/subscribe',
		backButton: '◽️ Вернуться назад',
		returnBackButton: '🟦 Вернуться назад',
	};
};

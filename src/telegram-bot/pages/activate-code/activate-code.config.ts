export interface ActivateCodeConfig {
	welcomeMessage: string;
	invalidCodeMessage: string;
	supportButton: string;
	activateCode: string;
}

export const activateCodeConfig = (): ActivateCodeConfig => {
	return {
		activateCode: 'admin',
		welcomeMessage:
			`Вас приветствует приложение Neweral AI! С помощью нашего бота вы сможете автоматизировать создание контента для ваших каналов.  \n` +
			`\n` +
			`Для того, чтобы активировать программу, вам нужно ввести код активации, выданный вам после оплаты. Если что-то пошло не так — напишите в нашу техподдержку`,
		invalidCodeMessage:
			`🥺 Упс, код введён неправильно. Убедитесь, что вы не допустили ошибок или напишите в техподдержку — мы поможем!\n` +
			`\n` +
			`Чтобы продолжить — попробуйте ввести код заново.`,
		supportButton: 'Техподдержка',
	};
};

export interface MainChannelConfig {
	addCategory: string;
	improveLimits: string;
	support: string;
	changePrompt: string;
	startMessage: string;
	isNotWork: string;
	chooseNextAction: string;
	exitButton: string;
	channelsLimit: number;
}

export const mainChannelConfig = (): MainChannelConfig => {
	return {
		addCategory: 'Добавить категорию',
		changePrompt: 'Изменить промпт',
		improveLimits: 'Повысить лимиты',
		exitButton: 'Обратно',
		startMessage:
			'Для того, чтобы начать работу вам нужно добавить основные каналы для которых будет генерироваться контент.\n' +
			'\n' +
			'Нажмите кнопку «Добавить основной канал» и выберите его категорию из предложенных. После этого отправьте ссылку на канал.\n' +
			'\n' +
			'Категория, впоследствии, будет отображаться в меню рядом с каналом.\n',
		chooseNextAction: 'Выберите дальнейшее действие:',
		support: 'Техническая поддержка',
		isNotWork: 'На сервере ведутся технические работы',
		channelsLimit: 3,
	};
};

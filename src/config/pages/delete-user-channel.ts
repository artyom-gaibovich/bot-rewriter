// delete-user-channel.config.ts
export interface DeleteUserChannelConfig {
	confirmationMessage: string;
	cancelButton: string;
	deleteButton: string;
	deletionSuccessMessage: string;
}

export const deleteUserChannelConfig = (): DeleteUserChannelConfig => {
	return {
		confirmationMessage:
			'Все подканалы у канала {link} удалятся. Вы уверены, что хотите его удалить?',
		cancelButton: 'Отменить',
		deleteButton: 'Удалить',
		deletionSuccessMessage: 'Канал {link} был удалён.',
	};
};

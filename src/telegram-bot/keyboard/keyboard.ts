import * as Interfaces from 'puregram/lib/generated/telegram-interfaces';
import { KeyboardInterface } from './keyboard.interface';

export const MainPageKeyboard: KeyboardInterface = {
	resize_keyboard: true,
	keyboard: [[{ text: 'Добавить каналы' }], [{ text: 'Переписать контент' }]],
};

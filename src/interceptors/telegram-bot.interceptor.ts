import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	Catch,
	ExceptionFilter,
	ArgumentsHost,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TelegramContextType } from 'nestjs-puregram';
import { TelegramContextModel } from '../telegram-bot/model/telegram-context-model';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			catchError((error) => {
				const ctx = context.switchToRpc().getContext<TelegramContextModel>(); // Или используйте switchToHttp() для HTTP запросов
				if (ctx) {
					ctx.send('Ошибка произошла. Попробуйте еще раз.'); // Или используйте ваш конфиг для сообщения об ошибке
				}
				return throwError(() => error);
			}),
		);
	}
}

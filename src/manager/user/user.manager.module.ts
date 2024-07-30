import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DIConstants } from '../../constants/DI.constants';
import { UserManager } from './user.manager';
import { UserServiceModule } from '../../client/storage/user/user.service.module';

@Module({
	imports: [ConfigModule, UserServiceModule],
	providers: [
		{
			provide: DIConstants.UserManager,
			useClass: UserManager,
		},
	],
	exports: [DIConstants.UserManager],
})
export class UserManagerModule {}

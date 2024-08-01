import { Module } from '@nestjs/common';
import { DIConstants } from '../../constants/DI.constants';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './user.repository';
import { UserServiceModule } from '../../client/storage/user/user.service.module';

@Module({
	imports: [UserServiceModule],
	providers: [
		{
			provide: DIConstants.UserRepository,
			useClass: UserRepository,
		},
	],
	exports: [DIConstants.UserRepository],
})
export class UserRepositoryModule {}

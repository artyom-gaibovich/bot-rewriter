import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserManagerModule } from './manager/user/user.manager.module';
import { UserRepositoryModule } from './repository/user/user.repository.module';
import { TelegramModule } from 'nestjs-puregram';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { MainChannelModule } from './telegram-bot/pages/main-channel/main-channel.module';
import { DeleteUserChannelModule } from './telegram-bot/pages/main-channel/delete-user-channel/delete-user-channel.module';
import { AddUserChannelModule } from './telegram-bot/pages/main-channel/add-user-channel/add-user-channel.module';
import { AddChannelCategoryModule } from './telegram-bot/pages/main-channel/add-user-channel/add-channel-category/add-channel-category.module';
import { ImproveLimitsModule } from './telegram-bot/pages/improve-limits/improve-limits.module';
import { AddChannelsPromoModule } from './telegram-bot/pages/add-channel-promo/add-channels-promo.module';
import { ActivateCodeModule } from './telegram-bot/pages/activate-code/activate-code.module';
import { AddChannelToRewriteModule } from './telegram-bot/pages/main-channel-to-rewrite/add/add-channel-to-rewrite.module';
import { SupportModule } from './telegram-bot/pages/support/support.module';
import { StartModule } from './telegram-bot/pages/start/start.module';

@Module({
	imports: [
		TelegramBotModule,
		TelegramModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				token: configService.get('BOT_TOKEN'),
			}),
		}),
		ConfigModule.forRoot({ isGlobal: true }),
	],
	providers: [],
	controllers: [],
})
export class AppModule {}

import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TelegramModule} from "nestjs-puregram";
import {AddChannelsActionModule} from "./customer-manager/actions/add-channels/add-channels.action.module";
import {AppController} from "./app.controller";
import {RewriteContentAction} from "./customer-manager/actions/rewrite-content/rewrite-content.action";
import {RewriteContentActionModule} from "./customer-manager/actions/rewrite-content/rewrite-content.action.module";
import {CustomerManagerModule} from "./customer-manager/customer-manager.module";

@Module({
  imports: [
      CustomerManagerModule,
      ConfigModule.forRoot({isGlobal : true}),
      TelegramModule.forRootAsync({
          imports : [ConfigModule],
          inject: [ConfigService],
          useFactory : (configService : ConfigService) => ({
              token : configService.get('BOT_TOKEN')
          })
      }),
  ],
    providers: [
        AppController
    ],
})
export class AppModule {

}

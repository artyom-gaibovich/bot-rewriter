import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TelegramModule} from "nestjs-puregram";
import {AddChannelsActionModule} from "./actions/add-channels/add-channels.action.module";
import {AppController} from "./app.controller";
import {RewriteContentAction} from "./actions/rewrite-content/rewrite-content.action";

@Module({
  imports: [
      AddChannelsActionModule,
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
        AppController, RewriteContentAction
    ],
})
export class AppModule {

}

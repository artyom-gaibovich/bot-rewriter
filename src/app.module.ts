import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TelegramModule} from "nestjs-puregram";
import {AddChannelsHandlerModule} from "./handlers/add-channels/add-channels.handler.module";
import {AppController} from "./app.controller";
import {RewriteContentHandler} from "./handlers/rewrite-content/rewrite-content.handler";
import {RewriteContentHandlerModule} from "./handlers/rewrite-content/rewrite-content.handler.module";

@Module({
  imports: [
      AddChannelsHandlerModule,
      RewriteContentHandlerModule,
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

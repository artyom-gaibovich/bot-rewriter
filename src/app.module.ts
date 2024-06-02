import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TelegramModule} from "nestjs-puregram";
import {AddChannelsAction} from "./actions/add-channels/add-channels.action";
import {AddChannelsActionModule} from "./actions/add-channels/add-channels.action.module";
import {AppController, SomeClass} from "./app.controller";

@Module({
  imports: [
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
        { provide: SomeClass, useValue: new SomeClass('asdasdas') }, // Provide SomeClass with a specific value
        AppController
    ],
})
export class AppModule {

}

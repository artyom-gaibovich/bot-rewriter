import {Ctx, Hears, Update} from "nestjs-puregram";
import {MessageContext} from "puregram";
import {StepContext} from "@puregram/scenes";
import {Inject, Injectable} from "@nestjs/common";

@Injectable()
export class SomeClass {
    constructor(public link : string) {
    }
}

@Update()
export class AppController {
    constructor(private someClass : SomeClass) {
    }

    @Hears('/channels')
    async signup(@Ctx() context: MessageContext & StepContext): Promise<unknown> {
        await context.reply(this.someClass.link)
        return context.scene.enter('AddChannels');
    }
}
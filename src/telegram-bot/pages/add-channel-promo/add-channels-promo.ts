import {TelegramContextModel} from "../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {ADD_CHANNELS_PROMO} from "../pages.types";
import {Inject} from "@nestjs/common";
import {ADD_CHANNELS_CONFIG} from "../../../constants/DI.constants";
import {AddChannelsConfig} from "./add-channels.config";

export interface AddChannelsPromoInterface extends Record<string, any> {
}

export type AddChannelsPromoContext = TelegramContextModel & StepContext<AddChannelsPromoInterface>

@Scene(ADD_CHANNELS_PROMO)
export class AddChannelsPromo {
    constructor(@Inject(ADD_CHANNELS_CONFIG) private config : AddChannelsConfig) {
    }
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : AddChannelsPromoContext) {
    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : AddChannelsPromoContext) {
        await telegramContext.send(this.config.zeroStep.message)

}
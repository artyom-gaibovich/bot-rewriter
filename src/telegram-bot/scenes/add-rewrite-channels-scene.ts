import {ADD_CHANNELS_TO_REWRITE_SCENE, MAIN_SCENE} from "./scenes.types";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {AddUserChannelsActionSceneContext} from "./add-user-channels-action-scene";

@Scene(ADD_CHANNELS_TO_REWRITE_SCENE)
export class AddRewriteChannelsScene {
    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext : AddUserChannelsActionSceneContext) {
        if (telegramContext.scene.step.firstTime) {
            telegramContext.scene.state.limit = 0

        }
    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext : AddUserChannelsActionSceneContext) {
        return await telegramContext.send('СЦЕНА ДЛЯ ПЕРЕПИСЫВАНИЯ')

    }

}
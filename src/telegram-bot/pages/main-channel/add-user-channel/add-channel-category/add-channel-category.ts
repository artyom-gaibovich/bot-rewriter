import {
    ADD_CHANNEL_CATEGORY, ADD_USER_CHANNEL_PAGE, MAIN_CHANNEL_PAGE,
} from "../../../pages.types";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {Inject} from "@nestjs/common";
import {CategoryRepositoryInterface} from "../../../../../repository/category/category.repository.interface";
import {TelegramContextModel} from "../../../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";
import {CATEGORY_REPOSITORY} from "../../../../../constants/DI.constants";
import {UserChannelInterface} from "../../../../../model/channel.interface";

export interface AddChannelCategoryInterface extends Record<string, any> {
    categories: CategoryInterface[];
    limit: number;
    currentPage: number;
    userChannels : UserChannelInterface[]
}

export type AddChannelCategoryContext = TelegramContextModel & StepContext<AddChannelCategoryInterface>;

@Scene(ADD_CHANNEL_CATEGORY)
export class AddChannelCategory {
    constructor(
        @Inject(CATEGORY_REPOSITORY) private repository: CategoryRepositoryInterface,
    ) {}

    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext: AddChannelCategoryContext) {
        if (telegramContext.scene.step.firstTime) {
            telegramContext.scene.state.categories = [...await this.repository.findAll()]

            telegramContext.scene.state.limit = 40; // specify your limit
            telegramContext.scene.state.currentPage = 0;
            return await this.showCategories(telegramContext);
        }
    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext: AddChannelCategoryContext) {
        if (telegramContext.text === 'Следующая') {
            telegramContext.scene.state.currentPage++;
            return await this.showCategories(telegramContext);
        }
        if (telegramContext.text === 'Назад') {
            telegramContext.scene.state.currentPage--;
            return await this.showCategories(telegramContext);
        }
        if (telegramContext.text === 'Выйти') {
            return await telegramContext.scene.enter(MAIN_CHANNEL_PAGE);
        }
        // //Разбиваю строку по пробелу, и выдергиваю категорию
        if (telegramContext.text !== 'Добавить категорию' && telegramContext.scene.state.categories.map(chn=>chn.title).includes(telegramContext.text)) {

            return await telegramContext.scene.enter(ADD_USER_CHANNEL_PAGE, {
                state : {
                    category : telegramContext.scene.state.categories.find(cat=>cat.title===telegramContext.text),
                    userChannels : telegramContext.scene.state.userChannels
                }
            })
        }
        if (!telegramContext.scene.step.firstTime) {
            return await this.showCategories(telegramContext)
        }

    }

    private async showCategories(telegramContext: AddChannelCategoryContext) {
        const { categories, limit, currentPage } = telegramContext.scene.state;
        const startIndex = currentPage * limit;
        const endIndex = startIndex + limit;
        const categoriesForPage = categories.slice(startIndex, endIndex);


        let mainKeyboard = [];
        if (currentPage === 0) {
            mainKeyboard = [
                ...categoriesForPage.map(category => [{ text: `${category.title}` }]),
                [{text: 'Следующая'}],
                [{text : 'Выйти'}],
            ];
        } else {
            if (categoriesForPage.length !== limit) {
                mainKeyboard = [
                    ...categoriesForPage.map(category => [{ text: category.title }]),
                    [{text : 'Назад'}],
                    [{text: 'Выйти'}],
                ];
            }
            else {
                mainKeyboard = [
                    ...categoriesForPage.map(category => [{ text: category.title }]),
                    [{text: 'Назад'}],
                    [{text: 'Следующая'}],
                    [{text : 'Выйти'}],
                ];
            }
        }

        return await telegramContext.send('Выберите дальнейшее действие', {
            reply_markup: {
                resize_keyboard: true,
                remove_keyboard: true,
                keyboard: mainKeyboard
            }
        });
    }
}

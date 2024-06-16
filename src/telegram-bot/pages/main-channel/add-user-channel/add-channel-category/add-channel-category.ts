import {
    ADD_CHANNEL_CATEGORY,
} from "../../../pages.types";
import {AddStep, Ctx, Scene, SceneEnter} from "nestjs-puregram";
import {Inject} from "@nestjs/common";
import {CategoryRepositoryInterface} from "../../../../../repository/category/category.repository.interface";
import {TelegramContextModel} from "../../../../model/telegram-context-model";
import {StepContext} from "@puregram/scenes";

export interface AddChannelCategoryInterface extends Record<string, any> {
    categories: CategoryInterface[];
    limit: number;
    currentPage: number;
}

export type AddChannelCategoryContext = TelegramContextModel & StepContext<AddChannelCategoryInterface>;

@Scene(ADD_CHANNEL_CATEGORY)
export class AddChannelCategory {
    constructor(
        @Inject('CATEGORY_REPOSITORY') private repository: CategoryRepositoryInterface,
    ) {}

    @SceneEnter()
    async sceneEnter(@Ctx() telegramContext: AddChannelCategoryContext) {
        if (telegramContext.scene.step.firstTime) {
            telegramContext.scene.state.categories = await this.repository.findAll();
            telegramContext.scene.state.limit = 5; // specify your limit
            telegramContext.scene.state.currentPage = 0;
            return await this.showCategories(telegramContext);
        }
    }

    @AddStep(0)
    async zeroStep(@Ctx() telegramContext: AddChannelCategoryContext) {
        if (telegramContext.text === 'Следующая') {
            telegramContext.scene.state.currentPage++;
            await this.showCategories(telegramContext);

        } else if (telegramContext.text === 'Назад') {
            telegramContext.scene.state.currentPage--;
            await this.showCategories(telegramContext);
        } else {
            // Handle category selection or exit
        }
    }

    private async showCategories(telegramContext: AddChannelCategoryContext) {
        const { categories, limit, currentPage } = telegramContext.scene.state;

        const startIndex = currentPage * limit;
        const endIndex = startIndex + limit;
        const categoriesForPage = categories.slice(startIndex, endIndex);

        const exitKeyboard = [
            [{ text: 'Выйти' }]
        ];
        const nextKeyboard = [
            [{ text: 'Следующая' }],
        ];
        const backKeyboard = [
            [{ text: 'Назад' }],
        ];

        let mainKeyboard = [];

        if (currentPage === 0) {
            mainKeyboard = [
                ...categoriesForPage.map(category => [{ text: category.title }]),
                ...nextKeyboard,
            ];
        } else {
            if (categoriesForPage.length !== limit) {
                mainKeyboard = [
                    ...backKeyboard,
                    ...categoriesForPage.map(category => [{ text: category.title }]),
                    ...exitKeyboard,
                ];
            }
            else {
                mainKeyboard = [
                    ...backKeyboard,
                    ...categoriesForPage.map(category => [{ text: category.title }]),
                    ...nextKeyboard,
                    ...exitKeyboard,
                ];
            }
        }
        console.log(mainKeyboard)
        await telegramContext.send('Выберите дальнейшее действие', {
            reply_markup: {
                resize_keyboard: true,
                remove_keyboard: true,
                keyboard: mainKeyboard
            }
        });
    }
}

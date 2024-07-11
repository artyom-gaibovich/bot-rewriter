import {Module} from "@nestjs/common";
import {EditPrompt} from "./edit-prompt";

@Module(
    {
        imports : [EditPromptModule],
        providers : [
            EditPrompt
        ],

    }
)
export class EditPromptModule {

}
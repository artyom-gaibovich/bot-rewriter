import {Module} from "@nestjs/common";
import {RewriteContentActionConfig} from "./rewrite-content.action.config";
import {RewriteContentAction} from "./rewrite-content.action";

@Module({
    providers: [
        {
            provide : RewriteContentActionConfig,
            useFactory: () => {
                return new RewriteContentActionConfig({link: 'http://localhost:4000/channels/posts'})
            },
        },
        RewriteContentAction
    ],
    exports: [RewriteContentActionConfig, RewriteContentAction]
})

export class RewriteContentActionModule {

}
import {Module} from "@nestjs/common";
import {RewriteContentAction} from "../actions/rewrite-content/rewrite-content.action";
import {RewriteContentActionModule} from "../actions/rewrite-content/rewrite-content.action.module";
import {ContentManager} from "./content.manager";
import {RewriteContentActionConfig} from "../actions/rewrite-content/rewrite-content.action.config";

@Module({
    imports: [RewriteContentActionModule],
    providers: [RewriteContentAction,ContentManager],
    exports: [RewriteContentAction, ContentManager],
})
export class ContentManagerModule {

}
import {Module} from "@nestjs/common";
import {RewriteContentAction} from "../actions/rewrite-content/rewrite-content.action";
import {RewriteContentActionModule} from "../actions/rewrite-content/rewrite-content.action.module";
import {ContentManager} from "./content.manager";

@Module({
    imports: [RewriteContentActionModule],
    providers: [RewriteContentAction,ContentManager],
    exports: [RewriteContentAction, ContentManager],
})
export class ContentManagerModule {

}
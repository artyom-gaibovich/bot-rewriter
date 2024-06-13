import {Module} from "@nestjs/common";
import {LinkValidator} from "./link.validator";

@Module({
    providers : [{
        provide : 'LINK_VALIDATOR',
        useFactory : () => {
            return new LinkValidator()
        }
    }],
    exports : ['LINK_VALIDATOR']
})
export class LinkValidatorModule {

}
import {Module} from "@nestjs/common";
import {CONTENT_AGENCY_CLIENT} from "../../constants/DI.constants";
import {ContentAgencyClient} from "../content-agency/content-agency.client";


@Module({
    providers : [
        {
            provide : CONTENT_AGENCY_CLIENT,
            useFactory : () => {
                return new StorageS()
            }
        }
    ],
    exports : [CONTENT_AGENCY_CLIENT]
})
export class ContentAgencyClientModule {

}
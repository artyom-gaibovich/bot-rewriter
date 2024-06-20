import {Module} from "@nestjs/common";
import {ADD_CHANNELS_PROMO_CONFIG} from "../../../constants/DI.constants";
import {AddChannelsPromoConfig} from "./add-channels-promo.config";
import {AddChannelsPromo} from "./add-channels-promo";
import {ADD_CHANNELS_PROMO_MESSAGE} from "../../../constants/messages.constants";

@Module({
    providers : [{
        provide : ADD_CHANNELS_PROMO_CONFIG,
        useFactory : () => {
            return {
                zeroStep : {
                    message : ADD_CHANNELS_PROMO_MESSAGE
                }
            } as AddChannelsPromoConfig
        }
    },
        AddChannelsPromo
    ]
})
export class AddChannelsPromoModule {

}
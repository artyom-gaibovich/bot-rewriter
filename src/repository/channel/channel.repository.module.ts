import {Module} from "@nestjs/common";
import {ChannelMockRepository} from "./channel-mock.repository";

@Module({
    providers : [
        {
            provide : 'CUSTOM_MOCK_REPOSITORY',
            useFactory: () => {
                return new ChannelMockRepository()
            }
        }
    ],
    exports : [`CUSTOM_MOCK_REPOSITORY`]
})
export class ChannelRepositoryModule {

}
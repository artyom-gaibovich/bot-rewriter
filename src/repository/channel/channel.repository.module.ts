import {Module} from "@nestjs/common";
import {ChannelMockRepository} from "./channel-mock.repository";
import {MOCK_REPOSITORY} from "../../constants/DI.constants";

@Module({
    providers : [
        {
            provide : MOCK_REPOSITORY,
            useFactory: () => {
                return new ChannelMockRepository()
            }
        }
    ],
    exports : [MOCK_REPOSITORY]
})
export class ChannelRepositoryModule {

}
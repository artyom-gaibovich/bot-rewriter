import { Module } from '@nestjs/common';
import { addChannelsPromoConfig } from './add-channels-promo.config';
import { ADD_CHANNELS_PROMO_CONFIG, DIConstants } from '../../../constants/DI.constants';
import { AddChannelsPromo } from './add-channels-promo';

@Module({
	providers: [
		{
			provide: DIConstants.AddChannelPromoConfig,
			useValue: addChannelsPromoConfig(),
		},
		{
			provide: DIConstants.AddChannelPromo,
			useClass: AddChannelsPromo,
		},
	],
})
export class AddChannelsPromoModule {}

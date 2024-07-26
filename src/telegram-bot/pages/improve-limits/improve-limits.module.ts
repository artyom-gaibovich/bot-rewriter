import { Module } from '@nestjs/common';
import { ImproveLimits } from './improve-limits';

@Module({
	providers: [ImproveLimits],
})
export class ImproveLimitsModule {}

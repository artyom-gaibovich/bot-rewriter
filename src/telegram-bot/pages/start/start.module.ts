import { Module } from '@nestjs/common';
import { START } from '../pages.types';
import { Start } from './start';

@Module({
	providers: [Start],
})
export class StartModule {}

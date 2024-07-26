import { Module } from '@nestjs/common';
import { Support } from './support';
import { SUPPORT } from '../pages.types';

@Module({
	providers: [Support],
})
export class SupportModule {}

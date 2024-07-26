import { Module } from '@nestjs/common';
import { ActivateCode } from './activate-code';
import { ACTIVATE_CODE } from '../pages.types';

@Module({
	providers: [ActivateCode],
})
export class ActivateCodeModule {}

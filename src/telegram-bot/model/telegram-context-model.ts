import { MessageContext } from 'puregram';
import { StepContext } from '@puregram/scenes';

export interface TelegramContextModel extends MessageContext, StepContext {}

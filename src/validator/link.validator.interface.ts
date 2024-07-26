import { LinkInterface } from '../model/link/link.interface';

export interface LinkValidatorInterface {
	validate(link: LinkInterface): boolean;
}

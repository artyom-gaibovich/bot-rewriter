import { LinkValidatorInterface } from './link.validator.interface';
import { LinkInterface } from '../model/link/link.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LinkValidator implements LinkValidatorInterface {
	validate(link: LinkInterface): boolean {
		return (
			(link.link.length <= 50 && link.link.length >= 9 && link.link.startsWith('https://')) ||
			link.link.startsWith('t.me')
		);
	}
}

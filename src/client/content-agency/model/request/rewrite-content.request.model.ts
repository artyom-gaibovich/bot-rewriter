import { LinkInterface } from '../../../../model/link/link.interface';

export interface RewriteContentRequestModel {
	url: LinkInterface;
	body: {
		prompt: string;
		links: LinkInterface[];
		limit?: number;
	};
}

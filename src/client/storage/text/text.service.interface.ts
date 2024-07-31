import { LinkInterface } from '../../../model/link/link.interface';

export interface TextServiceInterface {
	rewrite(req: { prompt: string; links: LinkInterface[]; limit?: number }): Promise<{
		response_key: string;
		response_message: string;
		data: string;
	}>;
}

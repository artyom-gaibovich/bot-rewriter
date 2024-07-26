import { RewriteContentResponseModel } from './model/response/rewrite-content.response.model';
import { CheckChannelsRequestModel } from './model/request/check-channels.request.model';
import { RewriteContentRequestModel } from './model/request/rewrite-content.request.model';

export interface ContentAgencyClientInterface {
	checkChannels(request: CheckChannelsRequestModel): Promise<CheckChannelsResponse>;

	rewriteContent(request: RewriteContentRequestModel): Promise<RewriteContentResponseModel>;
}

import {ContentModel} from "../content.model";

export interface RewriteContentResponseModel {
    rewriteContent : ContentModel
}


//подумаем над названиями
interface RewriteContent {
    channelLink: string;
    posts: (string | null)[];
    status: string;
}

export interface RewriteContentResponseNewModel {
    channelsWithPosts: RewriteContent[];
}



interface RewriteContent {
    channelLink: string;
    posts: (string | null)[];
    status: string;
}

export interface RewriteContentResponseModel {
    channelsWithPosts: RewriteContent[];
}
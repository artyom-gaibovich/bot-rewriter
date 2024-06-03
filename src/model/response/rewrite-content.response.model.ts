


interface RewriteContent {
    channelLink: string;
    posts: (string | null)[];
    status: string;
}

export interface RewriteContentResponseNewModel {
    channelsWithPosts: RewriteContent[];
}
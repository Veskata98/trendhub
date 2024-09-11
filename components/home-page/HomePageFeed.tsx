import { PostFeed } from '../posts/PostFeed';
import { getPosts } from '@/actions/post-actions/getPosts';

type HomePageFeedProps = {
    searchTerm: string;
    sort: 'hot' | 'new' | 'top';
};

export const HomePageFeed = async ({ searchTerm, sort }: HomePageFeedProps) => {
    const posts = await getPosts({ searchTerm, sort });

    return <PostFeed pageType="home" initialPosts={posts} searchTerm={searchTerm} sort={sort} />;
};

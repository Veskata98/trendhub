import prisma from '@/lib/db';
import { PostFeed } from '../../posts/PostFeed';
import { getPosts } from '@/actions/post-actions/getPosts';

type HomePageFeedProps = {
    searchTerm: string;
    sort: 'hot' | 'new' | 'top';
};

export const HomePageFeed = async ({ searchTerm, sort }: HomePageFeedProps) => {
    // const posts = await prisma.post.findMany({
    //     take: 10,
    //     orderBy: { created_at: 'desc' },
    //     include: { likes: true, trend: { select: { name: true, image_url: true } } },
    // });

    const posts = await getPosts({ searchTerm, sort });

    return <PostFeed initialPosts={posts} searchTerm={searchTerm} sort={sort} />;
};

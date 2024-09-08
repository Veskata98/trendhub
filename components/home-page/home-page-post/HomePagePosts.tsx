import prisma from '@/lib/db';
import { PostFeed } from './PostFeed';

export const HomePagePosts = async () => {
    const posts = await prisma.post.findMany({
        take: 10,
        orderBy: { created_at: 'desc' },
        include: { likes: true, trend: { select: { name: true, image_url: true } } },
    });

    return <PostFeed initialPosts={posts} />;
};

import prisma from '@/lib/db';
import { NewPosts } from './NewPosts';

export const PostsFetcher = async () => {
    const posts = await prisma.post.findMany({
        take: 10,
        orderBy: { created_at: 'desc' },
        include: { likes: true, trend: { select: { name: true, image_url: true } } },
    });

    return <NewPosts initialPosts={posts} />;
};

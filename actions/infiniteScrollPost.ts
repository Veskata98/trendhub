'use server';

import prisma from '@/lib/db';

const LIMIT = 10;

export const getPosts = async (page: number = 1) => {
    try {
        const skip = (page - 1) * LIMIT;
        const latestPosts = await prisma.post.findMany({
            skip,
            take: LIMIT,
            orderBy: { created_at: 'desc' },
            include: { likes: true, trend: { select: { name: true, image_url: true } } },
        });

        return latestPosts;
    } catch (error) {
        console.log(error);
        return [];
    }
};

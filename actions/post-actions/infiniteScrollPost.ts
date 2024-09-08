'use server';

import prisma from '@/lib/db';

const LIMIT = 10;

export const getPostsWithTrend = async (page: number = 1, username?: string, activity?: 'upvotes' | 'downvotes') => {
    try {
        const skip = (page - 1) * LIMIT;
        const latestPosts = await prisma.post.findMany({
            where: {
                ...(username && !activity && { creator_name: username }),
                ...(activity === 'upvotes' && { likes: { some: { type: 'LIKE', username } } }),
                ...(activity === 'downvotes' && { likes: { some: { type: 'DISLIKE', username } } }),
            },
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

export const getPostsWithCreator = async (page: number = 1, trendName: string) => {
    try {
        const skip = (page - 1) * LIMIT;
        const latestPosts = await prisma.post.findMany({
            where: {
                trend_name: trendName,
            },
            skip,
            take: LIMIT,
            orderBy: { created_at: 'desc' },
            include: { likes: true, creator: { select: { image_url: true } } },
        });

        return latestPosts;
    } catch (error) {
        console.log(error);
        return [];
    }
};

'use server';

import prisma from '@/lib/db';
import { hotPostQuery } from '@/lib/hotPostQuery';
import { ExtendedPost } from '@/types';

const LIMIT = 10;

type getPostsOptions = {
    page?: number;
    username?: string;
    trendName?: string;
    activity?: 'upvotes' | 'downvotes';
    searchTerm?: string;
    sort?: 'hot' | 'new' | 'top';
};

export const getPosts = async ({
    page = 1,
    username,
    trendName,
    activity,
    searchTerm = '',
    sort = 'hot',
}: getPostsOptions) => {
    const skip = (page - 1) * LIMIT;

    try {
        let posts;

        if (sort === 'hot') {
            posts = await hotPostQuery(searchTerm, skip, trendName);
        } else {
            posts = await prisma.post.findMany({
                where: {
                    ...(trendName && { trend_name: trendName }),
                    ...(username && !activity && { creator_name: username }),
                    ...(activity === 'upvotes' && { likes: { some: { type: 'LIKE', username } } }),
                    ...(activity === 'downvotes' && { likes: { some: { type: 'DISLIKE', username } } }),
                    ...(searchTerm && {
                        OR: [
                            { title: { contains: searchTerm, mode: 'insensitive' } },
                            { description: { contains: searchTerm, mode: 'insensitive' } },
                        ],
                    }),
                },
                skip,
                take: LIMIT,
                orderBy:
                    sort === 'new'
                        ? { created_at: 'desc' }
                        : sort === 'top'
                        ? { likes: { _count: 'desc' } }
                        : { created_at: 'desc' },
                include: {
                    likes: true,
                    trend: {
                        select: { name: true, image_url: true },
                    },
                    creator: {
                        select: {
                            image_url: true,
                        },
                    },
                    _count: { select: { comments: true } },
                },
            });
        }

        return posts as ExtendedPost[];
    } catch (error) {
        console.log(error);
        return [];
    }
};

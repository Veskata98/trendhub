import { Prisma } from '@prisma/client';
import prisma from './db';

const LIMIT = 10;

export const hotPostQuery = async (searchTerm: string, skip: number, trendName?: string) => {
    try {
        let posts;

        const rawQuery: any = await prisma.$queryRaw`
            WITH PostVotes AS (
                SELECT
                    p.id,
                    COUNT(CASE WHEN l.type = 'LIKE' THEN 1 END) AS upvotes,
                    COUNT(CASE WHEN l.type = 'DISLIKE' THEN 1 END) AS downvotes,
                    p.created_at
                FROM
                    "Post" p
                LEFT JOIN
                    "Like" l ON l."postId" = p.id

                ${Prisma.sql`
                    WHERE (p.title ILIKE '%' || ${searchTerm} || '%' OR p.description ILIKE '%' || ${searchTerm} || '%')
                    ${trendName ? Prisma.sql`AND p."trend_name" = ${trendName}` : Prisma.empty}
                `}
                
                GROUP BY
                    p.id
            )
            SELECT
                pv.id,
                (pv.upvotes - pv.downvotes) / POWER(EXTRACT(EPOCH FROM (NOW() - pv.created_at)) / 3600 + 2, 1.5) AS hotness_score
            FROM
                PostVotes pv
            ORDER BY
                hotness_score DESC
            OFFSET ${skip}
            LIMIT ${LIMIT}
        `;

        const postIds = rawQuery.map((resultObj: any) => resultObj.id);

        posts = await prisma.post.findMany({
            where: {
                id: {
                    in: postIds,
                },
            },
            include: {
                trend: {
                    select: {
                        image_url: true,
                        name: true,
                    },
                },
                creator: {
                    select: {
                        image_url: true,
                    },
                },
                likes: true,
                _count: { select: { comments: true } },
            },
        });

        const postMap = new Map(posts.map((post) => [post.id, post]));

        posts = postIds.map((id: any) => postMap.get(id));

        return posts;
    } catch (error) {
        console.error(error);
        return [];
    }
};

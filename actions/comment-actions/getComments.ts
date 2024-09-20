'use server';

import prisma from '@/lib/db';

export default async function getComments(username: string) {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                creator_name: username,
            },
            include: {
                likes: true,
                post: { include: { trend: true } },
            },
        });

        return comments;
    } catch (error) {
        console.error(error);
        return [];
    }
}

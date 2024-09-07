'use server';

import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { revalidateTag } from 'next/cache';

export const upvotePost = async (postId: string) => {
    try {
        const user = await serverUser();

        if (!user) {
            return;
        }

        const alreadyVoted = await prisma.like.findFirst({
            where: {
                postId,
                username: user.username,
            },
        });

        if (alreadyVoted) {
            if (alreadyVoted.type === 'LIKE') {
                await prisma.like.delete({
                    where: {
                        id: alreadyVoted.id,
                    },
                });

                revalidateTag(`${postId}`);
                return;
            } else {
                await prisma.like.update({
                    where: {
                        id: alreadyVoted.id,
                    },
                    data: {
                        type: 'LIKE',
                    },
                });

                revalidateTag(`${postId}`);
                return;
            }
        }

        await prisma.like.create({
            data: {
                type: 'LIKE',
                postId,
                username: user.username,
            },
        });

        revalidateTag(`${postId}`);
    } catch (error) {
        console.error(error);
    }
};

export const downvotePost = async (postId: string) => {
    try {
        const user = await serverUser();

        if (!user) {
            return;
        }

        const alreadyVoted = await prisma.like.findFirst({
            where: {
                postId,
                username: user.username,
            },
        });

        if (alreadyVoted) {
            if (alreadyVoted.type === 'DISLIKE') {
                await prisma.like.delete({
                    where: {
                        id: alreadyVoted.id,
                    },
                });

                revalidateTag(`${postId}`);
                return;
            } else {
                await prisma.like.update({
                    where: {
                        id: alreadyVoted.id,
                    },
                    data: {
                        type: 'DISLIKE',
                    },
                });

                revalidateTag(`${postId}`);
                return;
            }
        }

        await prisma.like.create({
            data: {
                type: 'DISLIKE',
                postId,
                username: user.username,
            },
        });

        revalidateTag(`${postId}`);
    } catch (error) {
        console.error(error);
    }
};

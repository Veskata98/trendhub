'use server';

import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { revalidatePath } from 'next/cache';

export const upvotePost = async (postId: string) => {
    try {
        const user = await serverUser();

        if (!user) {
            return { success: false };
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

                return { success: true, data: null };
            } else {
                const updatedLike = await prisma.like.update({
                    where: {
                        id: alreadyVoted.id,
                    },
                    data: {
                        type: 'LIKE',
                    },
                });

                return { success: true, data: updatedLike };
            }
        }

        const newUpvote = await prisma.like.create({
            data: {
                type: 'LIKE',
                postId,
                username: user.username,
            },
        });

        return { success: true, data: newUpvote };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
};

export const downvotePost = async (postId: string) => {
    try {
        const user = await serverUser();

        if (!user) {
            return { success: false };
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

                return { success: true, data: null };
            } else {
                const updatedDislike = await prisma.like.update({
                    where: {
                        id: alreadyVoted.id,
                    },
                    data: {
                        type: 'DISLIKE',
                    },
                });

                return { success: true, data: updatedDislike };
            }
        }

        const newDownvote = await prisma.like.create({
            data: {
                type: 'DISLIKE',
                postId,
                username: user.username,
            },
        });

        return { success: true, data: newDownvote };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
};

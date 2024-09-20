'use server';

import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { revalidatePath } from 'next/cache';

export const upvoteComment = async (commentId: string, revalidate?: boolean) => {
    try {
        const user = await serverUser();

        if (!user || !commentId) {
            return { success: false };
        }

        const post = await prisma.post.findFirst({
            where: {
                comments: {
                    some: {
                        id: commentId,
                    },
                },
            },
        });

        if (!post) {
            return { success: false };
        }

        const alreadyVoted = await prisma.commentLike.findFirst({
            where: {
                commentId,
                username: user.username,
            },
        });

        if (alreadyVoted) {
            if (alreadyVoted.type === 'LIKE') {
                await prisma.commentLike.delete({
                    where: {
                        id: alreadyVoted.id,
                    },
                });

                if (revalidate) {
                    revalidatePath(`/post/${post.id}`);
                }

                return { success: true, data: null };
            } else {
                const updatedVote = await prisma.commentLike.update({
                    where: {
                        id: alreadyVoted.id,
                    },
                    data: {
                        type: 'LIKE',
                    },
                });

                if (revalidate) {
                    revalidatePath(`/post/${post.id}`);
                }

                return { success: true, data: updatedVote };
            }
        }

        const newUpvote = await prisma.commentLike.create({
            data: {
                commentId,
                type: 'LIKE',
                username: user.username,
            },
        });

        if (revalidate) {
            revalidatePath(`/post/${post.id}`);
        }

        return { success: true, data: newUpvote };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
};

export const downvoteComment = async (commentId: string, revalidate?: boolean) => {
    try {
        const user = await serverUser();

        if (!user || !commentId) {
            return { success: false };
        }

        const post = await prisma.post.findFirst({
            where: {
                comments: {
                    some: {
                        id: commentId,
                    },
                },
            },
        });

        if (!post) {
            return { success: false };
        }

        const alreadyVoted = await prisma.commentLike.findFirst({
            where: {
                commentId,
                username: user.username,
            },
        });

        if (alreadyVoted) {
            if (alreadyVoted.type === 'DISLIKE') {
                await prisma.commentLike.delete({
                    where: {
                        id: alreadyVoted.id,
                    },
                });

                if (revalidate) {
                    revalidatePath(`/post/${post.id}`);
                }

                return { success: true, data: null };
            } else {
                const updatedVote = await prisma.commentLike.update({
                    where: {
                        id: alreadyVoted.id,
                    },
                    data: {
                        type: 'DISLIKE',
                    },
                });

                if (revalidate) {
                    revalidatePath(`/post/${post.id}`);
                }

                return { success: true, data: updatedVote };
            }
        }

        const newDownvote = await prisma.commentLike.create({
            data: {
                commentId,
                type: 'DISLIKE',
                username: user.username,
            },
        });

        if (revalidate) {
            revalidatePath(`/post/${post.id}`);
        }

        return { success: true, data: newDownvote };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
};

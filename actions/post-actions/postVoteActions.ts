'use server';

import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { ServerUser } from '@/types';
import { revalidatePath } from 'next/cache';

export const upvotePost = async (postId: string) => {
    try {
        const user = (await serverUser({ redirectToLogin: true })) as ServerUser;

        await prisma.like.create({
            data: {
                type: 'LIKE',
                postId,
                username: user.username,
            },
        });

        revalidatePath(`/`);
    } catch (error) {
        console.error(error);
    }
};

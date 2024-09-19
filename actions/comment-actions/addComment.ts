'use server';

import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { revalidatePath } from 'next/cache';

export const addComment = async (formData: FormData, postId: string, parentId?: string) => {
    try {
        const user = await serverUser();
        if (!user) {
            return { success: false };
        }

        const content = formData.get('content') as string;

        if (!content || !postId) {
            return { success: false };
        }

        await prisma.comment.create({
            data: {
                content: content.trim(),
                postId,
                creator_name: user.username,
                parentId: parentId || null,
            },
        });

        revalidatePath(`/post/${postId}`);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
};

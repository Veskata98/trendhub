'use server';

import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { revalidatePath } from 'next/cache';

export const changeAvatar = async (username: string, imageUrl: string | null) => {
    try {
        const user = await serverUser();

        if (!user) {
            return;
        }

        const profile = await prisma.profile.findUnique({ where: { username } });

        if (!profile || user.username !== profile.username) {
            return;
        }

        if (!imageUrl) {
            return;
        }

        await prisma.profile.update({
            where: {
                username,
            },
            data: {
                image_url: imageUrl,
            },
        });

        revalidatePath(`/profile/${username}`);
    } catch (error) {
        console.error(error);
    }
};

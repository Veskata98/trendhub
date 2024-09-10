'use server';

import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { clerkClient } from '@clerk/nextjs/server';
import { revalidateTag } from 'next/cache';

const deleteProfile = async (username: string) => {
    try {
        if (!username) return { success: false };

        const user = await serverUser();
        if (!user) return { success: false };

        const profile = await prisma.profile.findUnique({
            where: {
                username,
            },
        });

        if (!profile) return { success: false };

        await clerkClient().users.deleteUser(user.id);
        await prisma.profile.delete({ where: { username } });

        revalidateTag(`/profile/${username}`);

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
};

export default deleteProfile;

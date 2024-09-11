'use server';

import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { revalidatePath } from 'next/cache';

export const changeTrendImage = async (imageUrl: string, trendName: string) => {
    try {
        if (!imageUrl || !trendName) return { success: false };

        const user = await serverUser();

        if (!user) return { success: false };

        const profile = await prisma.profile.findUnique({ where: { username: user.username } });

        if (!profile) return { success: false };

        const trend = await prisma.trend.findUnique({ where: { name: trendName } });

        if (!trend) return { success: false };

        if (trend.creator_name !== user.username) return { success: false };

        await prisma.trend.update({
            where: {
                name: trendName,
            },
            data: {
                image_url: imageUrl,
            },
        });

        revalidatePath(`/t/${trendName}`);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
};

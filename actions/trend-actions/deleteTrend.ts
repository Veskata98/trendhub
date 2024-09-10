'use server';

import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { revalidateTag } from 'next/cache';

const deleteTrend = async (trendName: string) => {
    try {
        if (!trendName) return { success: false };

        const user = await serverUser();
        if (!user) return { success: false };

        const trend = await prisma.trend.findUnique({
            where: {
                name: trendName,
                creator_name: user.username,
            },
        });

        if (!trend) return { success: false };

        await prisma.trend.delete({ where: { name: trendName } });
        revalidateTag('trend');

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
};

export default deleteTrend;

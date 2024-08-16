'use server';

import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

export const joinTrend = async (trendName: string) => {
    try {
        const user = await currentUser();
        if (!user || !user.username) {
            return;
        }

        const profile = await prisma.profile.findFirst({ where: { username: user.username } });

        if (!profile) {
            return;
        }

        await prisma.trend.update({
            where: {
                name: trendName,
            },
            data: {
                members: { connect: { id: profile.id } },
            },
        });
    } catch (error) {}
};

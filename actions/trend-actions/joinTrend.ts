'use server';

import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { revalidatePath } from 'next/cache';

export const joinTrend = async (trendName: string) => {
    try {
        const user = await serverUser({ redirectToLogin: true });

        //Get the profile from db
        const profile = await prisma.profile.findFirst({
            where: { username: user!.username },
            include: {
                created_trends: {
                    where: {
                        name: trendName,
                    },
                    select: {
                        name: true,
                    },
                },
            },
        });

        //Check if the profile exists in db and he is not the owner of the trend
        if (!profile || profile.created_trends.length > 0) {
            return;
        }

        await prisma.trendOnProfile.create({
            data: {
                trend_name: trendName,
                profile_username: profile.username,
            },
        });
        revalidatePath(`/t/${trendName}`);
    } catch (error) {
        console.log(error);
        return;
    }
};

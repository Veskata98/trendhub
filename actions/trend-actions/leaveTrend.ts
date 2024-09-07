'use server';

import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { revalidatePath } from 'next/cache';

export const leaveTrend = async (trendName: string) => {
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

        await prisma.trendOnProfile.delete({
            where: {
                profile_username_trend_name: {
                    profile_username: profile.username,
                    trend_name: trendName,
                },
            },
        });
        revalidatePath(`/t/${trendName}`);
    } catch (error) {
        console.log(error);
        return;
    }
};

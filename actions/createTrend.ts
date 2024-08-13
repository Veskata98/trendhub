'use server';

import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const createTrend = async (formdata: FormData) => {
    // throw new Error('fail');

    const user = await currentUser();

    if (!user) {
        return;
    }

    const profile = await prisma.profile.findFirst({ where: { username: user?.username || '' } });

    if (!profile) {
        return;
    }

    const name = formdata.get('name') as string;
    const description = formdata.get('description') as string;

    await prisma.trend.create({
        data: {
            name,
            description,
            creator_name: profile.username,
        },
    });

    redirect(`/trend/${name}`);
};

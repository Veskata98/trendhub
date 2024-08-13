'use server';

import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import z, { ZodError } from 'zod';

const trendSchema = z.object({
    name: z.string().min(3, { message: 'Trend name at least 3 characters' }),
    description: z.string().min(10, { message: 'Description at least 10 characters' }),
});

export const createTrend = async (formdata: FormData) => {
    const name = formdata.get('name') as string;
    const description = formdata.get('description') as string;

    try {
        const user = await currentUser();

        if (!user || !user.username) {
            return;
        }

        const parseError = trendSchema.safeParse({ name, description }).error;

        if (parseError) {
            throw parseError;
        }

        await prisma.trend.create({
            data: {
                name,
                description,
                creator_name: user.username,
                image_url: '/default-trend-logo.png',
            },
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return error.flatten().fieldErrors;
        }
        console.log(error);
    }

    redirect(`/t/${name}`);
};

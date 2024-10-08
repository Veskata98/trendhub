'use server';

import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import z, { ZodError } from 'zod';

const trendSchema = z.object({
    name: z.string().min(3, { message: 'Trend Name too short (min 3 characters)' }),
    description: z.string().min(10, { message: 'Trend Description too short (min 10 characters)' }),
    imageUrl: z.union([z.string(), z.null()]).optional(),
});

export const createTrend = async (formdata: FormData, imageUrl: string | null) => {
    const name = formdata.get('name') as string;
    const description = formdata.get('description') as string;

    try {
        const user = await serverUser();

        const parseError = trendSchema.safeParse({ name, description, imageUrl }).error;

        if (parseError) {
            throw parseError;
        }

        const alreadyExistingTrend = await prisma.trend.findFirst({
            where: { name: { equals: name, mode: 'insensitive' } },
        });

        if (alreadyExistingTrend) {
            throw 'Trend already exists';
        }

        await prisma.trend.create({
            data: {
                name: name.trim(),
                description: description.trim(),
                creator_name: user!.username,
                image_url: imageUrl ? imageUrl : '/default-trend-logo.png',
            },
        });
        revalidateTag('trend');
    } catch (error) {
        if (error instanceof ZodError) {
            return error.flatten().fieldErrors;
        }
        if (typeof error === 'string') {
            return { serverError: [error] };
        }

        console.log(error);
    }

    redirect(`/t/${name}`);
};

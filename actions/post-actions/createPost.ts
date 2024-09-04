'use server';

import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { redirect } from 'next/navigation';
import z, { ZodError } from 'zod';

const postSchema = z.object({
    title: z
        .string()
        .regex(/^[a-zA-Z0-9\s]*$/, {
            message: 'Title must be alphanumeric',
        })
        .min(3, { message: 'Title must be at least 3 characters' }),
    description: z.string().optional(),
    imageUrl: z.union([z.string(), z.null()]).optional(),
});

export const createPost = async (formData: FormData, trendName: string, imageUrl: string | null) => {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    try {
        const user = await serverUser({ redirectToLogin: true });

        const trend = await prisma.trend.findFirst({
            where: {
                name: trendName,
                AND: [
                    {
                        OR: [
                            { creator_name: user!.username },
                            {
                                members: {
                                    some: {
                                        profile_username: user!.username,
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        });

        if (!trend) {
            throw 'Join the trend before creating post';
        }

        const parseError = postSchema.safeParse({ title, description, imageUrl }).error;

        if (parseError) {
            throw parseError;
        }

        await prisma.post.create({
            data: {
                title,
                trend_name: trendName,
                description,
                image_url: imageUrl,
                creator_name: user!.username,
            },
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return error.flatten().fieldErrors;
        }

        if (typeof error === 'string') {
            return { authError: [error] };
        }

        console.log(error);
        return { serverError: ['Something went wrong'] };
    }

    redirect(`/t/${trendName}`);
};

'use server';

import prisma from '@/lib/db';

export const getTrends = async (searchTerm: string) => {
    try {
        if (!searchTerm) return [];

        const trends = await prisma.trend.findMany({
            where: {
                name: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            },
        });

        return trends;
    } catch (error) {
        console.error(error);
        return [];
    }
};

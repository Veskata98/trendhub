'use server';

import prisma from '@/lib/db';

export const getProfiles = async (searchTerm: string) => {
    try {
        if (!searchTerm) return [];

        const profiles = await prisma.profile.findMany({
            where: {
                username: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            },
        });

        return profiles;
    } catch (error) {
        console.error(error);
        return [];
    }
};

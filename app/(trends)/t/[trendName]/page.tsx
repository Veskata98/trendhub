import { TrendHeader } from '@/components/trends/trend-header/TrendHeader';
import { TrendPosts } from '@/components/trends/trend-main/TrendPosts';
import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { UserStatus } from '@/types';

import { redirect } from 'next/navigation';

type TrendNamePageProps = {
    params: {
        trendName: string;
    };
};

export default async function TrendNamePage({ params }: TrendNamePageProps) {
    const trendName = params.trendName;
    const user = await serverUser();

    let userStatus: UserStatus = 'nonMember';

    const trend = await prisma.trend.findUnique({
        where: {
            name: trendName,
        },
        include: {
            members: {
                select: {
                    profile_username: true,
                },
            },
            posts: {
                orderBy: {
                    created_at: 'desc',
                },
                take: 10,
                include: {
                    likes: true,
                    creator: { select: { image_url: true } },
                },
            },
        },
    });

    if (!trend) {
        redirect('/');
    }

    if (trend.creator_name === user?.username) {
        userStatus = 'owner';
    } else {
        const isMember = trend.members.some((trendUser) => trendUser.profile_username === user?.username);
        isMember ? (userStatus = 'member') : (userStatus = 'nonMember');
    }

    if (!user) {
        userStatus = 'guest';
    }

    return (
        <section className="w-full">
            <div className="w-full md:w-2/3 mx-auto p-4 space-y-2">
                <TrendHeader trend={trend} userStatus={userStatus} />
                <TrendPosts posts={trend.posts} />
            </div>
        </section>
    );
}

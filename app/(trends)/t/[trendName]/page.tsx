import { getPosts } from '@/actions/post-actions/getPosts';
import { TrendHeader } from '@/components/trends/trend-header/TrendHeader';
import { TrendPosts } from '@/components/trends/trend-main/TrendPosts';
import { TrendSidebar } from '@/components/trends/trend-sidebar/TrendSidebar';
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
            creator: {
                select: {
                    image_url: true,
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

    const posts = await getPosts({ trendName });

    return (
        <section className="flex p-4 px-0 md:px-4 w-full justify-between xl:justify-center gap-4">
            <div className="w-full px-2 py-4 pt-4 xl:w-auto flex-1 scroll-hidden">
                <TrendHeader trend={trend} userStatus={userStatus} />
                <TrendPosts trendName={trendName} initialPosts={posts} />
            </div>
            <TrendSidebar trend={trend} />
        </section>
    );
}

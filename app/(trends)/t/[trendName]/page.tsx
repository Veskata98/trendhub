import { getPosts } from '@/actions/post-actions/getPosts';
import { TrendHeader } from '@/components/trends/trend-header/TrendHeader';
import { TrendMain } from '@/components/trends/trend-main/TrendMain';
import { TrendSidebar } from '@/components/trends/trend-sidebar/TrendSidebar';
import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';
import { UserStatus } from '@/types';

import { redirect } from 'next/navigation';

type TrendNamePageProps = {
    params: {
        trendName: string;
    };
    searchParams: { sort: string; search: string };
};

export const dynamic = 'force-dynamic';

export default async function TrendNamePage({ params, searchParams }: TrendNamePageProps) {
    const searchTerm = searchParams.search;
    let sort = searchParams.sort;

    if (sort !== 'hot' && sort !== 'new' && sort !== 'top') {
        sort = 'hot';
    }

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

    const posts = await getPosts({ trendName, searchTerm, sort: sort as 'hot' | 'new' | 'top' });

    const canEdit = user?.username === trend.creator_name;

    return (
        <section className="flex py-2 px-0 pb-2 lg:px-2 xl:px-4 w-full justify-between xl:justify-center gap-0 xl:gap-4">
            <div className="w-full px-2 py-4 pt-4 xl:w-auto flex-1 scroll-hidden">
                <TrendHeader trend={trend} canEdit={canEdit} />
                <TrendMain
                    searchTerm={searchTerm}
                    sort={sort as 'hot' | 'new' | 'top'}
                    trend={trend}
                    posts={posts}
                    userStatus={userStatus}
                />
            </div>
            <TrendSidebar trend={trend} />
        </section>
    );
}

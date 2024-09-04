'use client';

import Image from 'next/image';
import { Trend } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { joinTrend } from '@/actions/joinTrendAction';
import { UserStatus } from '@/types';
import { leaveTrend } from '@/actions/leaveTrend';
import { CreatePost } from '@/components/posts/create-post/CreatePost';

export const TrendHeader = ({ trend, userStatus }: { trend: Trend; userStatus: UserStatus }) => {
    const searchParams = useSearchParams();

    return (
        <div className="w-full flex flex-col">
            <div className="flex items-center justify-center gap-2">
                <Image src={trend.image_url} alt="trend_logo" width={48} height={48} className="rounded-full" />
                <span className="text-xl font-semibold">t/{trend.name}</span>
            </div>
            <div className="flex justify-between items-center border-b-[1px] border-zinc-300/50 dark:border-zinc-700/50 pb-2">
                <div>Sort type</div>
                <div className="flex gap-1 items-center">
                    {(userStatus === 'owner' || userStatus === 'member') && <CreatePost trendName={trend.name} />}

                    {userStatus === 'member' && (
                        <Button
                            className="font-semibold text-rose-500 hover:bg-rose-500/20"
                            onClick={() => {
                                leaveTrend(trend.name);
                            }}
                        >
                            Leave
                        </Button>
                    )}

                    {userStatus === 'nonMember' && (
                        <Button
                            className="font-semibold text-emerald-500 hover:bg-emerald-500/20"
                            onClick={() => {
                                joinTrend(trend.name);
                            }}
                        >
                            Join
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

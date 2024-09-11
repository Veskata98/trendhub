'use client';

import { Button } from '@/components/ui/button';
import { joinTrend } from '@/actions/trend-actions/joinTrend';
import { TrendWithMembers, UserStatus } from '@/types';
import { leaveTrend } from '@/actions/trend-actions/leaveTrend';
import { CreatePostButton } from '@/components/trends/trend-header/CreatePostButton';
import { TrendName } from './TrendName';
import TrendImage from './TrendImage';
import TrendEditableImage from './TrendEditableImage';

export const TrendHeader = ({
    trend,
    userStatus,
    canEdit,
}: {
    trend: TrendWithMembers;
    userStatus: UserStatus;
    canEdit: boolean;
}) => {
    // const searchParams = useSearchParams();

    return (
        <div className="w-full flex flex-col px-2 space-y-6">
            <div className="flex items-center justify-center gap-2">
                {canEdit ? (
                    <TrendEditableImage imageUrl={trend.image_url} trendName={trend.name} />
                ) : (
                    <TrendImage imageUrl={trend.image_url} />
                )}

                <TrendName trendName={trend.name} />
            </div>
            <div className="flex justify-between items-center border-b-[1px] border-zinc-300/50 dark:border-zinc-700/50 pb-2">
                <div>Sort type</div>
                <div className="flex gap-1 items-center">
                    {(userStatus === 'owner' || userStatus === 'member') && <CreatePostButton trendName={trend.name} />}

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

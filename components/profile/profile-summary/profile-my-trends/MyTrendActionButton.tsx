'use client';

import { joinTrend } from '@/actions/trend-actions/joinTrend';
import { leaveTrend } from '@/actions/trend-actions/leaveTrend';
import { Button } from '@/components/ui/button';
import { TrendWithMembers } from '@/types';
import { Trend } from '@prisma/client';

export const MyTrendActionButton = ({
    trend,
    currentUserUsername,
}: {
    trend: TrendWithMembers;
    currentUserUsername: string | undefined;
}) => {
    const isCreator = (trend: Trend) => {
        return trend.creator_name === currentUserUsername;
    };

    return isCreator(trend) ? (
        <Button className="font-semibold text-primary-800 dark:text-primary-300 hover:bg-black/30">Delete</Button>
    ) : trend.members.some((member) => member.profile_username === currentUserUsername) ? (
        <Button
            className="font-semibold text-rose-500 hover:bg-rose-500/20"
            onClick={() => {
                leaveTrend(trend.name);
            }}
        >
            Leave
        </Button>
    ) : (
        <Button
            className="font-semibold text-emerald-500 hover:bg-emerald-500/20"
            onClick={() => {
                joinTrend(trend.name);
            }}
        >
            Join
        </Button>
    );
};

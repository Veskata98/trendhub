"use client";

import { joinTrend } from "@/actions/trend-actions/joinTrend";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { TrendWithMembers } from "@/types";
import { Trend } from "@prisma/client";

export const JoinedActionButton = ({
    trend,
    currentUserUsername,
}: {
    trend: TrendWithMembers;
    currentUserUsername: string | undefined;
}) => {
    const { onOpen } = useModal();

    const isCreator = (trend: Trend) => {
        return trend.creator_name === currentUserUsername;
    };

    return isCreator(trend) ? (
        <p className="w-10">-</p>
    ) : trend.members.some(
          (member) => member.profile_username === currentUserUsername,
      ) ? (
        <Button
            className="font-semibold text-rose-500 hover:bg-rose-500/20"
            onClick={() => onOpen("leaveTrend", { trendName: trend.name })}
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

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { TrendWithMembers } from '@/types';
import Link from 'next/link';
import React from 'react';

const TrendInfo = ({ trend }: { trend: TrendWithMembers }) => {
    return (
        <div className="space-y-6 pt-4 px-1 sm:px-2 md:px-4">
            <div className="space-y-2">
                <h2 className="font-bold">t/{trend.name}</h2>
                <p className="text-sm">{trend.description}</p>
            </div>
            <Separator className="bg-zinc-700" />
            <div className="flex flex-col items-center">
                <p className="font-semibold">{trend.members.length + 1}</p>
                <span className="text-sm font-semibold">Members</span>
            </div>
            <Separator className="bg-zinc-700" />
            <div className="space-y-3">
                <h6 className="text-center text-sm">Creator</h6>
                <Link href={`/profile/${trend.creator_name}`} className="flex flex-col items-center">
                    <Avatar className="h-10 w-10 shadow">
                        {trend.creator.image_url ? (
                            <AvatarImage src={trend.creator.image_url} alt="user_avatar" />
                        ) : (
                            <AvatarFallback>{trend.creator_name.at(0)?.toUpperCase()}</AvatarFallback>
                        )}
                    </Avatar>
                    <p className="font-semibold text-sm">{trend.creator_name}</p>
                </Link>
            </div>
        </div>
    );
};

export default TrendInfo;

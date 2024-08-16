'use client';

import Image from 'next/image';
import { Trend } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { joinTrend } from '@/actions/joinTrendAction';

export const TrendHeader = ({ trend }: { trend: Trend }) => {
    const searchParams = useSearchParams();

    return (
        <div className="w-full flex flex-col">
            <div className="flex items-center justify-center gap-2">
                <Image src={trend.image_url} alt="trend_logo" width={48} height={48} className="rounded-full" />
                <span className="text-xl font-semibold">t/{trend.name}</span>
            </div>
            <div className="flex justify-between items-center border-b-[1px] border-zinc-600">
                <div>Sort type</div>
                <div>
                    <Button>Add post</Button>
                    <Button
                        onClick={() => {
                            joinTrend(trend.name);
                        }}
                    >
                        Join
                    </Button>
                </div>
            </div>
        </div>
    );
};

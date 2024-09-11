'use client';

import { TrendWithMembers } from '@/types';
import { TrendName } from './TrendName';
import TrendImage from './TrendImage';
import TrendEditableImage from './TrendEditableImage';

export const TrendHeader = ({ trend, canEdit }: { trend: TrendWithMembers; canEdit: boolean }) => {
    return (
        <div className="w-full flex flex-col px-2 space-y-6 pb-4">
            <div className="flex items-center justify-center gap-2">
                {canEdit ? (
                    <TrendEditableImage imageUrl={trend.image_url} trendName={trend.name} />
                ) : (
                    <TrendImage imageUrl={trend.image_url} />
                )}

                <TrendName trendName={trend.name} />
            </div>
        </div>
    );
};

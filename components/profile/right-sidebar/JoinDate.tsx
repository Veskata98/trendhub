import { cn } from '@/lib/utils';
import moment from 'moment';
import React from 'react';

export const JoinDate = ({ joinDate, className }: { joinDate: string; className?: string }) => {
    return (
        <div className="flex flex-col items-center font-semibold">
            <p>{moment(joinDate).format('DD.MM.YYYY')}</p>
            <p className={cn('text-sm', className)}>Join Date</p>
        </div>
    );
};

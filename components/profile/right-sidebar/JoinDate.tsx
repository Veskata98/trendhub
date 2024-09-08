import moment from 'moment';
import React from 'react';

export const JoinDate = ({ joinDate }: { joinDate: string }) => {
    return (
        <div className="flex flex-col items-center font-semibold">
            <p>{moment(joinDate).format('DD.MM.YYYY')}</p>
            <p className="text-sm">Join Date</p>
        </div>
    );
};

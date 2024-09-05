'use client';

import { cn } from '@/lib/utils';
import { UserPen } from 'lucide-react';

import { useState } from 'react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type ProfileAvatarProps = {
    canEdit: boolean;
    src: string;
    username: string;
};

export const ProfileAvatar = ({ canEdit, src, username }: ProfileAvatarProps) => {
    const [showEdit, setShowEdit] = useState(false);

    if (!canEdit) {
        return (
            <div className="relative">
                <Avatar className={cn('h-[100px] w-[100px] border-zinc-500 border-[1px] border-opacity-20 shadow')}>
                    {src ? (
                        <AvatarImage src={src} alt="trend_avatar" />
                    ) : (
                        <AvatarFallback className="text-6xl">{username.at(0)?.toUpperCase()}</AvatarFallback>
                    )}
                </Avatar>
            </div>
        );
    }

    const handleAvatarChange = () => {
        //TODO: Change Avatar functionality
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={cn('relative', showEdit && 'cursor-pointer')}
                        onMouseEnter={() => setShowEdit(true)}
                        onMouseLeave={() => setShowEdit(false)}
                        onClick={handleAvatarChange}
                    >
                        <Avatar
                            className={cn(
                                'h-[100px] w-[100px] border-zinc-500 border-[1px] border-opacity-20 shadow',
                                showEdit && 'opacity-50'
                            )}
                        >
                            {src ? (
                                <AvatarImage src={src} alt="trend_avatar" />
                            ) : (
                                <AvatarFallback className="text-6xl">{username.at(0)?.toUpperCase()}</AvatarFallback>
                            )}
                        </Avatar>

                        {showEdit && (
                            <UserPen className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-white text-zinc-900">
                    <p>Change Avatar</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

'use client';

import { cn } from '@/lib/utils';
import { UserPen } from 'lucide-react';
import Image from 'next/image';

import { useState } from 'react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../ui/tooltip';

type ProfileAvatarProps = {
    canEdit: boolean;
    src: string;
};

export const ProfileAvatar = ({ canEdit, src }: ProfileAvatarProps) => {
    const [showEdit, setShowEdit] = useState(false);

    if (!canEdit) {
        return (
            <div className="relative">
                <Image
                    className="rounded-full object-cover object-center"
                    src={src || '/no-avatar.png'}
                    width={100}
                    height={100}
                    alt="user_avatar"
                />
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
                        <Image
                            className={cn('rounded-full object-cover object-center', showEdit && 'opacity-50')}
                            src={src || '/no-avatar.png'}
                            width={100}
                            height={100}
                            alt="user_avatar"
                        />
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

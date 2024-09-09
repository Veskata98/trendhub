'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { EditableAvatar } from './EditableAvatar';

type ProfileAvatarProps = {
    canEdit: boolean;
    src: string;
    username: string;
};

export const ProfileAvatar = ({ canEdit, src, username }: ProfileAvatarProps) => {
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

    return <EditableAvatar src={src} username={username} />;
};

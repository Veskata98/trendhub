import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { Like } from '@prisma/client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import LoadingSpinner from '@/components/other/LoadingSpinner';

type DownVoteButtonProps = {
    postId: string;
    likes: Like[];
    handleDownvote: (postId: string) => void;
};

export const DownVoteButton = ({ postId, likes, handleDownvote }: DownVoteButtonProps) => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const isDownvoted = likes.find(
        (like) => like.type === 'DISLIKE' && like.postId === postId && like.username === user?.username
    );

    return loading ? (
        <div className="px-[6px]">
            <LoadingSpinner className="w-5 h-5" />
        </div>
    ) : (
        <Button
            onClick={async () => {
                setLoading(true);
                await handleDownvote(postId);
                setLoading(false);
            }}
            variant="ghost"
            size="sm"
            className={cn('px-[6px]', !user?.username && 'pointer-events-none')}
        >
            {isDownvoted ? (
                <Image src="/downvote-arrow-filled.svg" alt="downvote_arrow" width={20} height={20} />
            ) : (
                <Image src="/downvote-arrow.svg" alt="downvote_arrow" width={20} height={20} />
            )}
        </Button>
    );
};

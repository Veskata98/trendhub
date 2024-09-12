import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { Like } from '@prisma/client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import LoadingSpinner from '@/components/other/LoadingSpinner';

type UpVoteButtonProps = {
    postId: string;
    likes: Like[];
    handleUpvote: (postId: string) => void;
};

export const UpVoteButton = ({ postId, likes, handleUpvote }: UpVoteButtonProps) => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const isUpvoted = likes.find(
        (like) => like.type === 'LIKE' && like.postId === postId && like.username === user?.username
    );

    return loading ? (
        <div className="px-[6px]">
            <LoadingSpinner className="w-5 h-5" />
        </div>
    ) : (
        <Button
            onClick={async () => {
                setLoading(true);
                await handleUpvote(postId);
                setLoading(false);
            }}
            variant="ghost"
            size="sm"
            className={cn('px-[6px]', !user?.username && 'pointer-events-none')}
        >
            {isUpvoted ? (
                <Image src="/upvote-arrow-filled.svg" alt="upvote_arrow" width={20} height={20} />
            ) : (
                <Image src="/upvote-arrow.svg" alt="upvote_arrow" width={20} height={20} />
            )}
        </Button>
    );
};

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { Like } from '@prisma/client';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type DownVoteButtonProps = {
    postId: string;
    likes: Like[];
    handleDownvote: (postId: string) => void;
};

export const DownVoteButton = ({ postId, likes, handleDownvote }: DownVoteButtonProps) => {
    const { user } = useUser();

    const isDownvoted = likes.find(
        (like) => like.type === 'DISLIKE' && like.postId === postId && like.username === user?.username
    );

    return (
        <Button
            onClick={() => handleDownvote(postId)}
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

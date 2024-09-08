import { downvotePost } from '@/actions/post-actions/postVoteActions';
import { Button } from '../ui/button';
import { useUser } from '@clerk/nextjs';
import { Like } from '@prisma/client';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type DownVoteButtonProps = {
    postId: string;
    likes: Like[];
};

export const DownVoteButton = ({ postId, likes }: DownVoteButtonProps) => {
    const { user } = useUser();

    const isDownvoted = likes.find(
        (like) => like.type === 'DISLIKE' && like.postId === postId && like.username === user?.username
    );

    const onClick = async () => {
        await downvotePost(postId);
    };

    return (
        <Button
            onClick={onClick}
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

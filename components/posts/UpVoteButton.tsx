import { upvotePost } from '@/actions/post-actions/postVoteActions';
import { Button } from '../ui/button';
import { useUser } from '@clerk/nextjs';
import { Like } from '@prisma/client';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type UpVoteButtonProps = {
    postId: string;
    likes: Like[];
};

export const UpVoteButton = ({ postId, likes }: UpVoteButtonProps) => {
    const { user } = useUser();

    const isUpvoted = likes.find(
        (like) => like.type === 'LIKE' && like.postId === postId && like.username === user?.username
    );

    const onClick = async () => {
        await upvotePost(postId);
    };

    return (
        <Button
            onClick={onClick}
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

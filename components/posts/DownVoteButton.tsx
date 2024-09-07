import { downvotePost } from '@/actions/post-actions/postVoteActions';
import { Button } from '../ui/button';
import { ArrowBigDown } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { Like } from '@prisma/client';
import { cn } from '@/lib/utils';

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
            className={cn(
                'px-[6px]',
                isDownvoted && 'bg-rose-400 hover:bg-rose-400/80',
                !user?.username && 'pointer-events-none'
            )}
        >
            <ArrowBigDown className={cn('h-5 w-5 text-muted-foreground', isDownvoted && 'text-white')} />
        </Button>
    );
};

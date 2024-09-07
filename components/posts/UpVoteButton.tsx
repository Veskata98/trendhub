import { upvotePost } from '@/actions/post-actions/postVoteActions';
import { Button } from '../ui/button';
import { ArrowBigUp } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { Like } from '@prisma/client';
import { cn } from '@/lib/utils';

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
            className={cn(
                'px-[6px]',
                isUpvoted && 'bg-emerald-300 hover:bg-emerald-300/80',
                !user?.username && 'pointer-events-none'
            )}
        >
            <ArrowBigUp className={cn('h-5 w-5 text-muted-foreground', isUpvoted && 'text-white')} />
        </Button>
    );
};

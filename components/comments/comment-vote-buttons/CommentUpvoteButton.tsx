import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { CommentLike } from '@prisma/client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import LoadingSpinner from '@/components/other/LoadingSpinner';
import { upvoteComment } from '@/actions/comment-actions/commentVoteActions';

type CommentUpvoteButtonProps = {
    commentId: string;
    likes: CommentLike[];
};

export const CommentUpvoteButton = ({ commentId, likes }: CommentUpvoteButtonProps) => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const isUpvoted = likes.find(
        (like) => like.type === 'LIKE' && like.commentId === commentId && like.username === user?.username
    );

    const handleUpvote = async () => {
        setLoading(true);
        await upvoteComment(commentId, true);
        setLoading(false);
    };

    return loading ? (
        <div className="px-[6px]">
            <LoadingSpinner className="w-4 h-4" />
        </div>
    ) : (
        <Button disabled={!user} onClick={handleUpvote} variant="ghost" size="sm" className="px-1">
            {isUpvoted ? (
                <Image src="/upvote-arrow-filled.svg" alt="upvote_arrow" width={16} height={16} />
            ) : (
                <Image src="/upvote-arrow.svg" alt="upvote_arrow" width={16} height={16} />
            )}
        </Button>
    );
};

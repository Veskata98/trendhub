import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { CommentLike } from '@prisma/client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import LoadingSpinner from '@/components/other/LoadingSpinner';
import { downvoteComment, upvoteComment } from '@/actions/comment-actions/commentVoteActions';

type CommentDownvoteButtonProps = {
    commentId: string;
    likes: CommentLike[];
};

export const CommentDownvoteButton = ({ commentId, likes }: CommentDownvoteButtonProps) => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const isDownVoted = likes.find(
        (like) => like.type === 'DISLIKE' && like.commentId === commentId && like.username === user?.username
    );

    const handleUpvote = async () => {
        setLoading(true);
        await downvoteComment(commentId, true);
        setLoading(false);
    };

    return loading ? (
        <div className="px-[6px]">
            <LoadingSpinner className="w-4 h-4" />
        </div>
    ) : (
        <Button disabled={!user} onClick={handleUpvote} variant="ghost" size="sm" className="px-1">
            {isDownVoted ? (
                <Image src="/downvote-arrow-filled.svg" alt="downvote_arrow" width={16} height={16} />
            ) : (
                <Image src="/downvote-arrow.svg" alt="downvote_arrow" width={16} height={16} />
            )}
        </Button>
    );
};

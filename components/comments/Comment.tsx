import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';
import { ExtendedComment } from '@/types';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import SubmitReplyForm from './comment-forms/SubmitReplyForm';
import CommentReplies from './CommentReplies';
import { CommentUpvoteButton } from './comment-vote-buttons/CommentUpvoteButton';
import { CommentLikeCount } from './CommentsLikeCount';
import { CommentDownvoteButton } from './comment-vote-buttons/CommentDownvoteButton';

export default function Comment({ comment, depth = 0 }: { comment: ExtendedComment; depth?: number }) {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const { user } = useUser();

    const replyClose = () => {
        setShowReplyInput(false);
    };

    return (
        <div className={`mt-4 ${depth > 0 ? 'ml-6 border-l-[1px] border-gray-200 dark:border-gray-500 pl-4' : ''}`}>
            <Link className="flex items-center space-x-2" href={`/profile/${comment.creator_name}`}>
                <Avatar className="h-6 w-6 shadow">
                    <AvatarImage src={comment.creator?.image_url} alt={comment.creator_name} />
                    <AvatarFallback>{comment.creator_name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{comment.creator_name}</span>
            </Link>

            <p className="mt-2 text-sm">{comment.content}</p>
            <div className="mt-2 flex items-center space-x-2">
                <CommentUpvoteButton commentId={comment.id} likes={comment.likes} />
                <CommentLikeCount likes={comment.likes} />
                <CommentDownvoteButton commentId={comment.id} likes={comment.likes} />

                <Button disabled={!user} variant="ghost" size="sm" onClick={() => setShowReplyInput(!showReplyInput)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Reply
                </Button>
            </div>
            {showReplyInput && user && <SubmitReplyForm comment={comment} replyClose={replyClose} />}

            {/* Render replies recursively */}
            {comment.replies?.length > 0 && <CommentReplies depth={depth} replies={comment.replies} />}
        </div>
    );
}

'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { ProfilePageComments } from '@/types';
import Link from 'next/link';
import { CommentLikeCount } from '../CommentsLikeCount';
import { CommentUpvoteButton } from '../comment-vote-buttons/CommentUpvoteButton';
import { CommentDownvoteButton } from '../comment-vote-buttons/CommentDownvoteButton';
import moment from 'moment';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function ProfileCommentCard({ comment }: { comment: ProfilePageComments }) {
    return (
        <Card className="w-full max-w-[750px] dark:bg-zinc-700/30 mx-auto">
            <CardHeader className="text-sm gap-2 pt-4 pb-2 px-4 md:px-6">
                <div className="flex gap-2 items-center">
                    <Link className="flex items-center space-x-2" href={`/profile/${comment.creator_name}`}>
                        <Avatar className="h-6 w-6 shadow">
                            <AvatarImage src={comment.post.trend.image_url} alt={comment.creator_name} />
                        </Avatar>
                        <span className="font-semibold">t/{comment.post.trend.name}</span>
                    </Link>
                    <span>•</span>
                    <Link className="hover:underline" href={`/post/${comment.postId}`}>
                        {comment.post.title}
                    </Link>
                </div>
                <p className="text-xs text-muted-foreground !mt-0">Commented {moment(comment.created_at).fromNow()}</p>
            </CardHeader>
            <CardContent className="pb-2">
                <p className="mt-2 text-sm">{comment.content}</p>
                <div className="mt-2 flex items-center space-x-2">
                    <CommentUpvoteButton commentId={comment.id} likes={comment.likes} />
                    <CommentLikeCount likes={comment.likes} />
                    <CommentDownvoteButton commentId={comment.id} likes={comment.likes} />
                </div>
            </CardContent>
        </Card>
    );
}

'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import ReturnButton from './ReturnButton';
import Link from 'next/link';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import moment from 'moment';
import { PostImage } from '../PostImage';
import { UpVoteButton } from '../vote-buttons/UpVoteButton';
import { PostLikeCount } from '../PostLikeCount';
import { DownVoteButton } from '../vote-buttons/DownVoteButton';
import { MessageSquare } from 'lucide-react';
import SharePostButton from '../SharePostButton';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ExtendedPostWithComments } from '@/types';
import SubmitCommentForm from '@/components/comments/SubmitCommentForm';

const PostPageComponent = ({ post }: { post: ExtendedPostWithComments }) => {
    const handleUpvote = async (postId: string) => {
        // const result = await upvotePost(postId);
        // if (!result.success) return;
    };

    const handleDownvote = async (postId: string) => {
        // const result = await downvotePost(postId);
        // if (!result.success) return;};
    };

    return (
        <div className="w-full max-w-[750px] p-4 md:py-8 space-y-4 mx-auto">
            <Card className="dark:bg-zinc-700/30 relative">
                <ReturnButton />
                <CardHeader className="p-4 md:px-6">
                    <div className="flex flex-row items-center gap-2">
                        <Link href={`/t/${post.trend_name}`}>
                            <Avatar className="h-8 w-8 shadow">
                                <AvatarImage src={post.trend.image_url} alt="avatar" />
                            </Avatar>
                        </Link>
                        <div className="text-sm font-semibold !m-0">
                            <div>
                                <Link href={`/t/${post.trend_name}`}>t/{post.trend_name}</Link>
                                <span className="text-zinc-500 dark:text-zinc-400 text-xs">
                                    {' '}
                                    • {moment(post.created_at).fromNow()}
                                </span>
                            </div>
                            <Link
                                href={`/profile/${post.creator_name}`}
                                className="hover:bg-primary-500/10 text-xs font-normal"
                            >
                                {post.creator_name}
                            </Link>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <h2 className="md:text-lg font-bold">{post.title}</h2>
                    {post.description && (
                        <p className="text-muted-foreground text-sm md:text-base">{post.description}</p>
                    )}
                    {post.image_url && <PostImage imageUrl={post.image_url} />}
                </CardContent>
                <CardFooter className="flex justify-between pb-2 md:pb-4 px-1 md:px-6">
                    <div className="flex items-center space-x-1">
                        <UpVoteButton handleUpvote={handleUpvote} postId={post.id} likes={post.likes} />
                        <PostLikeCount likes={post.likes} />
                        <DownVoteButton handleDownvote={handleDownvote} postId={post.id} likes={post.likes} />
                    </div>
                    <div className="flex gap-2 items-center select-none">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm sm:text-base">{post.comments.length} Comments</span>
                    </div>
                    <SharePostButton postId={post.id} />
                </CardFooter>
            </Card>
            <SubmitCommentForm postId={post.id} />
        </div>
    );
};

export default PostPageComponent;

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowBigDown, ArrowBigUp, MessageSquare, Share2 } from 'lucide-react';
import moment from 'moment';
import { PostWithCreatorAvatarAndLikes } from '@/types';
import Link from 'next/link';
import { PostImage } from './PostImage';
import { UpVoteButton } from './UpVoteButton';
import { PostLikeCount } from './PostLikeCount';
import { DownVoteButton } from './DownVoteButton';

export const PostCard = ({ post }: { post: PostWithCreatorAvatarAndLikes }) => {
    return (
        <Card className="w-full max-w-[750px] dark:bg-zinc-700/30">
            <CardHeader className="flex flex-row items-center gap-4 py-4 px-4 md:px-6">
                <Avatar className="h-8 w-8">
                    {post.creator.image_url ? (
                        <AvatarImage src={post.creator.image_url} alt="trend_avatar" />
                    ) : (
                        <AvatarFallback className="text-lg select-none">
                            {post.creator_name.at(0)?.toUpperCase()}
                        </AvatarFallback>
                    )}
                </Avatar>
                <p className="text-sm font-semibold !m-0">
                    <Link href={`/profile/${post.creator_name}`}>{post.creator_name}</Link>
                    <span className="text-zinc-500 dark:text-zinc-400"> • {moment(post.created_at).fromNow()}</span>
                </p>
            </CardHeader>
            <CardContent className="space-y-2">
                <h2 className="md:text-xl font-bold">{post.title}</h2>
                {post.description && <p className="text-muted-foreground text-sm md:text-base">{post.description}</p>}
                {post.image_url && <PostImage imageUrl={post.image_url} />}
            </CardContent>
            <CardFooter className="flex justify-between pb-2 md:pb-4 px-2 md:px-6">
                <div className="flex items-center space-x-2">
                    <UpVoteButton postId={post.id} likes={post.likes} />
                    <PostLikeCount likes={post.likes} />
                    <DownVoteButton postId={post.id} likes={post.likes} />
                </div>
                <Button variant="ghost" size="sm" className="space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>0 Comments</span>
                </Button>
                <Button variant="ghost" size="sm" className="space-x-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                </Button>
            </CardFooter>
        </Card>
    );
};

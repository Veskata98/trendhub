'use client';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { MessageSquare, Share2 } from 'lucide-react';
import moment from 'moment';
import { ExtendedPost, PostCardPageType } from '@/types';
import Link from 'next/link';
import { PostImage } from './PostImage';
import { PostLikeCount } from './PostLikeCount';
import { UpVoteButton } from './vote-buttons/UpVoteButton';
import { DownVoteButton } from './vote-buttons/DownVoteButton';

type PostCardProps = {
    pageType: PostCardPageType;
    post: ExtendedPost;
    handleUpvote: (postId: string) => void;
    handleDownvote: (postId: string) => void;
};

export const PostCard = ({ pageType, post, handleUpvote, handleDownvote }: PostCardProps) => {
    const isHomePage = pageType === 'home';
    const isTrendPage = pageType === 'trend';
    const isProfilePage = pageType === 'profile';

    return (
        <Card className="w-full max-w-[750px] dark:bg-zinc-700/30">
            <CardHeader className="flex flex-row items-center gap-2 py-4 px-4 md:px-6">
                {isHomePage && (
                    <>
                        <Link href={`/t/${post.trend_name}`}>
                            <Avatar className="h-8 w-8 shadow">
                                <AvatarImage src={post.trend?.image_url} alt="trend_avatar" />
                                <AvatarFallback>T</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className="flex flex-col !mt-0">
                            <Link href={`/t/${post.trend_name}`}>
                                <p className="text-sm font-semibold">t/{post.trend?.name}</p>
                            </Link>

                            <p className="text-xs text-muted-foreground">
                                Posted by {post.creator_name} • {moment(post.created_at).fromNow()}
                            </p>
                        </div>
                    </>
                )}

                {isTrendPage && (
                    <>
                        <Link href={`/profile/${post.creator_name}`}>
                            <Avatar className="h-8 w-8 shadow">
                                {post?.creator?.image_url ? (
                                    <AvatarImage src={post.creator.image_url} alt="avatar" />
                                ) : (
                                    <AvatarFallback className="text-lg select-none">
                                        {post.creator_name.at(0)?.toUpperCase()}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                        </Link>
                        <div className="text-sm font-semibold !m-0">
                            <Link href={`/profile/${post.creator_name}`}>{post.creator_name}</Link>
                            <span className="text-zinc-500 dark:text-zinc-400 text-xs">
                                {' '}
                                • {moment(post.created_at).fromNow()}
                            </span>
                        </div>
                    </>
                )}

                {isProfilePage && (
                    <>
                        <Link href={`/t/${post.trend_name}`}>
                            <Avatar className="h-8 w-8 shadow">
                                <AvatarImage src={post.trend?.image_url} alt="trend_avatar" />
                                <AvatarFallback>T</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className="text-sm font-semibold !m-0">
                            <Link href={`/t/${post.trend_name}`} className="text-sm font-semibold">
                                t/{post.trend?.name}
                            </Link>
                            <span className="text-zinc-500 dark:text-zinc-400 text-xs">
                                {' '}
                                • {moment(post.created_at).fromNow()}
                            </span>
                        </div>
                    </>
                )}
            </CardHeader>
            <CardContent className="space-y-2">
                <h2 className="md:text-lg font-bold">{post.title}</h2>
                {post.description && <p className="text-muted-foreground text-sm md:text-base">{post.description}</p>}
                {post.image_url && <PostImage imageUrl={post.image_url} />}
            </CardContent>
            <CardFooter className="flex justify-between pb-2 md:pb-4 px-1 md:px-6">
                <div className="flex items-center space-x-1">
                    <UpVoteButton handleUpvote={handleUpvote} postId={post.id} likes={post.likes} />
                    <PostLikeCount likes={post.likes} />
                    <DownVoteButton handleDownvote={handleDownvote} postId={post.id} likes={post.likes} />
                </div>
                <Button variant="ghost" size="sm" className="space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm sm:text-base">0 Comments</span>
                </Button>
                <Button variant="ghost" size="sm" className="space-x-2">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm sm:text-base">Share</span>
                </Button>
            </CardFooter>
        </Card>
    );
};

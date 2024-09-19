import { downvotePost, upvotePost } from '@/actions/post-actions/postVoteActions';
import ReturnButton from '@/components/posts/post-page/ReturnButton';
import { PostCard } from '@/components/posts/PostCard';
import { PostImage } from '@/components/posts/PostImage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import prisma from '@/lib/db';
import { updateVotes } from '@/lib/utils';
import { MessageSquare, Share2 } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function PostPage({ params }: { params: { postId: string } }) {
    const post = await prisma.post.findUnique({
        where: {
            id: params.postId,
        },
        include: {
            comments: {
                include: {
                    replies: true,
                },
            },
            creator: {
                select: {
                    image_url: true,
                },
            },
        },
    });

    if (!post) {
        redirect('/');
    }

    //TODO: Post with comments page

    return (
        <div className="w-full h-full py-8">
            <Card className="w-full max-w-[750px] dark:bg-zinc-700/30 mx-auto relative">
                <ReturnButton />
                <CardHeader className="flex flex-row items-center gap-2 py-4 px-4 md:px-6">
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
                </CardHeader>
                <CardContent className="space-y-2">
                    <h2 className="md:text-lg font-bold">{post.title}</h2>
                    {post.description && (
                        <p className="text-muted-foreground text-sm md:text-base">{post.description}</p>
                    )}
                    {post.image_url && <PostImage imageUrl={post.image_url} />}
                </CardContent>
                <CardFooter className="flex justify-between pb-2 md:pb-4 px-1 md:px-6">
                    {/* <div className="flex items-center space-x-1">
                        <UpVoteButton handleUpvote={handleUpvote} postId={post.id} likes={post.likes} />
                        <PostLikeCount likes={post.likes} />
                        <DownVoteButton handleDownvote={handleDownvote} postId={post.id} likes={post.likes} />
                    </div> */}
                    <Link href={`/post/${post.id}`} className="flex gap-2 items-center">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm sm:text-base">0 Comments</span>
                    </Link>
                    <Button variant="ghost" size="sm" className="space-x-2">
                        <Share2 className="h-4 w-4" />
                        <span className="text-sm sm:text-base">Share</span>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

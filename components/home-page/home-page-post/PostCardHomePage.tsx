import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import { Button } from '../../ui/button';
import { ArrowBigDown, ArrowBigUp, MessageSquare, Share2 } from 'lucide-react';
import { PostWithTrendAndLikes } from '@/types';

import moment from 'moment';

import { PostImage } from '../../posts/PostImage';
import Link from 'next/link';

export const PostCardHomePage = ({ post }: { post: PostWithTrendAndLikes }) => {
    return (
        <Card className="w-full max-w-[750px] dark:bg-zinc-700/30">
            <CardHeader className="flex flex-row items-center gap-4 py-4 px-4 md:px-6">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={post.trend.image_url} alt="trend_avatar" />
                    <AvatarFallback>T</AvatarFallback>
                </Avatar>
                <div className="flex flex-col !mt-0">
                    <Link href={`/t/${post.trend_name}`}>
                        <p className="text-sm font-semibold">{post.trend.name}</p>
                    </Link>
                    <p className="text-xs text-muted-foreground">
                        Posted by {post.creator_name} • {moment(post.created_at).fromNow()}
                    </p>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <h2 className="md:text-xl font-bold">{post.title}</h2>
                {post.description && <p className="text-muted-foreground text-sm md:text-base">{post.description}</p>}
                {post.image_url && <PostImage imageUrl={post.image_url} />}
            </CardContent>
            <CardFooter className="flex justify-between pb-2 md:pb-4 px-2 md:px-6">
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="px-1">
                        <ArrowBigUp className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <span className="font-bold">{0}</span>
                    <Button variant="ghost" size="sm" className="px-1">
                        <ArrowBigDown className="h-5 w-5 text-muted-foreground" />
                    </Button>
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

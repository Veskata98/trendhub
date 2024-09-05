import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowBigDown, ArrowBigUp, MessageSquare, Share2 } from 'lucide-react';
import moment from 'moment';
import { PostWithCreatorAndLikes } from '@/types';
import Link from 'next/link';

export const PostCard = ({ post }: { post: PostWithCreatorAndLikes }) => {
    return (
        <Card className="w-full dark:bg-zinc-700/30">
            <CardHeader className="flex flex-row items-center gap-4 py-4">
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
                <h2 className="text-xl font-bold">{post.title}</h2>
                {post.description && <p className="text-muted-foreground">{post.description}</p>}
                {post.image_url && (
                    <div className="w-full h-64 relative">
                        <Image src={post.image_url} alt="post_image" fill className="object-contain" />
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
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

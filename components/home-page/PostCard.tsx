import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowBigDown, ArrowBigUp, MessageSquare, Share2 } from 'lucide-react';
import moment from 'moment';
import { PostWithTrendAndLikes } from '@/types';

export const PostCard = ({ post }: { post: PostWithTrendAndLikes }) => {
    return (
        <Card className="w-full max-w-2xl dark:bg-zinc-700/30">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={post.trend.image_url} alt="User avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p className="text-sm font-semibold">{post.trend.name}</p>
                    <p className="text-xs text-muted-foreground">
                        Posted by {post.creator_name} • {moment(post.created_at).fromNow()}
                    </p>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <h2 className="text-xl font-bold">{post.title}</h2>
                {post.description && <p className="text-muted-foreground">{post.description}</p>}
                {post.image_url && (
                    <div className="w-full h-64 relative">
                        <Image src={post.image_url} alt="post_image" fill className="object-contain" />
                    </div>
                )}

                {!post.image_url && !post.description && (
                    <div className="select-none w-full rounded-sm p-4 flex justify-center items-center">
                        <span className="tracking-wide text-s font-semibold text-zinc-500">
                            404: Description Not Found
                        </span>
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
                    <span>24 Comments</span>
                </Button>
                <Button variant="ghost" size="sm" className="space-x-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                </Button>
            </CardFooter>
        </Card>
    );
};

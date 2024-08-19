import { ScrollArea } from '@/components/ui/scroll-area';
import { Like, Post } from '@prisma/client';
import { ArrowDown, ArrowUp, Dot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';

interface PostWithLikes extends Post {
    likes: Like[];
}

type TrendPostsProps = {
    posts: PostWithLikes[];
};

export const TrendPosts = ({ posts }: TrendPostsProps) => {
    return (
        <ScrollArea>
            {posts.map((post) => (
                <div key={post.id} className="px-2 py-1">
                    <div className="font-semibold flex items-center">
                        <Link href={`/profile/${post.creator_name}`} className="text-zinc-300 text-sm">
                            {post.creator_name}
                        </Link>
                        <span className="text-zinc-500 text-xs flex items-center">
                            <Dot width={20} height={20} />
                            {moment(post.created_at).fromNow()}
                        </span>
                    </div>

                    <h2 className="font-semibold text-lg">{post.title}</h2>

                    {post.description && <p>{post.description}</p>}
                    {post.image_url && (
                        <div className="w-full h-64 relative">
                            <Image src={post.image_url} alt="post_image" fill className="object-contain" />
                        </div>
                    )}

                    {!post.image_url && !post.description && (
                        <div className="select-none w-full bg-zinc-700 rounded-sm p-6 flex justify-center items-center">
                            <span className="tracking-wide text-s font-semibold text-zinc-500">Empty here</span>
                        </div>
                    )}
                    <div className="flex gap-2 items-center">
                        <p className="flex gap-2 items-center">
                            <ArrowUp />
                            {post.likes.map((like) => like.type === 'LIKE').length}
                        </p>
                        <p className="flex gap-2 items-center">
                            <ArrowDown />
                            {post.likes.map((like) => like.type === 'DISLIKE').length}
                        </p>
                    </div>
                </div>
            ))}
        </ScrollArea>
    );
};

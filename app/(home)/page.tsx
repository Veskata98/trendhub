import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/db';
import { ArrowDown, ArrowUp, Dot } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
    const latestPosts = await prisma.post.findMany({
        take: 10,
        include: { likes: true, trend: { select: { name: true, image_url: true } } },
    });
    console.log(latestPosts);

    return (
        <ScrollArea className="w-7/12 px-8 py-4 mx-auto">
            {latestPosts.map((post) => (
                <div key={post.id} className="px-2 py-2 space-y-2">
                    <div className="font-semibold flex items-center">
                        <Link href={`/t/${post.trend.name}`} className="flex gap-2 items-center p-2">
                            <Image src={post.trend.image_url} alt="trend_image" width={20} height={20} />
                            <span>{post.trend.name}</span>
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
                    <Separator className="h-[1px] w-full bg-zinc-600" />
                </div>
            ))}
        </ScrollArea>
    );
}

import { PostCard } from '@/components/posts/PostCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import prisma from '@/lib/db';

type ProfilePageProps = {
    params: {
        username: string;
    };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
    const username = params.username;

    const posts = await prisma.post.findMany({
        where: {
            creator_name: username,
        },
        include: {
            creator: {
                select: {
                    image_url: true,
                },
            },
            likes: true,
        },
        orderBy: {
            created_at: 'desc',
        },
    });

    return (
        <ScrollArea className="w-full px-2 md:px-8 py-2 mx-auto">
            <div className="space-y-2 flex flex-col items-center">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </ScrollArea>
    );
}

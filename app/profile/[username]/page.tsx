import { PostFeed } from '@/components/home-page/home-page-post/PostFeed';
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
            trend: {
                select: {
                    image_url: true,
                    name: true,
                },
            },
        },
        orderBy: {
            created_at: 'desc',
        },
        take: 10,
    });

    return <PostFeed initialPosts={posts} isHomePage={false} username={username} />;
}

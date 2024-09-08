import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { PostFeed } from '@/components/home-page/home-page-post/PostFeed';
import prisma from '@/lib/db';

type ProfileActivityPageProps = {
    params: {
        activity: string;
        username: string;
    };
};

const ACTIVITY_TYPES = ['posts', 'comments', 'upvotes', 'downvotes'];

export const dynamic = 'force-dynamic';

export default async function ProfileActivityPage({ params }: ProfileActivityPageProps) {
    const activity = params.activity;
    const username = params.username;

    const user = await currentUser();

    if (!ACTIVITY_TYPES.includes(activity)) {
        redirect('/');
    }

    if (!(user?.username === username) && (activity === 'upvotes' || activity === 'downvotes')) {
        redirect('/');
    }

    const posts = await prisma.post.findMany({
        where: {
            ...(activity === 'posts' && { creator_name: username }),
            ...(activity === 'upvotes' && { likes: { some: { type: 'LIKE', username } } }),
            ...(activity === 'downvotes' && { likes: { some: { type: 'DISLIKE', username } } }),
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

    if (activity === 'upvotes' && user?.username) {
        return <PostFeed initialPosts={posts} username={user.username} activity="upvotes" />;
    }

    if (activity === 'downvotes' && user?.username) {
        return <PostFeed initialPosts={posts} username={user.username} activity="downvotes" />;
    }

    return <PostFeed initialPosts={posts} isHomePage={false} username={username} />;
}

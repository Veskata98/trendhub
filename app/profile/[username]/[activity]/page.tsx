import { redirect } from 'next/navigation';
import { PostFeed } from '@/components/posts/PostFeed';
import prisma from '@/lib/db';
import serverUser from '@/lib/serverUser';

type ProfileActivityPageProps = {
    params: {
        activity: string;
        username: string;
    };
};

const ACTIVITY_TYPES = ['posts', 'comments', 'upvotes', 'downvotes'];

export default async function ProfileActivityPage({ params }: ProfileActivityPageProps) {
    const activity = params.activity;
    const username = params.username;

    const user = await serverUser();

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
            _count: { select: { comments: true } },
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

    if (activity === 'comments') {
        return <p>TODO: Comments</p>;
    }

    if (activity === 'upvotes' && user?.username) {
        return <PostFeed initialPosts={posts} username={user.username} activity="upvotes" pageType="profile" />;
    }

    if (activity === 'downvotes' && user?.username) {
        return <PostFeed initialPosts={posts} username={user.username} activity="downvotes" pageType="profile" />;
    }

    return <PostFeed initialPosts={posts} pageType="profile" username={username} />;
}

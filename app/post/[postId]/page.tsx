import prisma from '@/lib/db';
import PostPageComponent from '@/components/posts/post-page/PostPageComponent';
import { nestComments } from '@/lib/nestComments';
import { ExtendedComment } from '@/types';
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
            trend: {
                select: {
                    image_url: true,
                },
            },
            likes: true,
            _count: { select: { comments: true } },
        },
    });

    if (!post) {
        redirect('/');
    }

    const comments = await prisma.comment.findMany({
        where: {
            postId: post.id,
        },
        include: {
            replies: true,
            creator: {
                select: {
                    image_url: true,
                },
            },
            likes: true,
        },
    });

    const nestedComments = nestComments(comments as ExtendedComment[]);

    return (
        <div className="w-full h-full overflow-scroll scroll-hidden">
            <PostPageComponent post={post} comments={nestedComments} />
        </div>
    );
}

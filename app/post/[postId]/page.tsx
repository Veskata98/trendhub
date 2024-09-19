import PostPageComponent from '@/components/posts/post-page/PostPageComponent';
import prisma from '@/lib/db';
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
        },
    });

    if (!post) {
        redirect('/');
    }

    //TODO: Post with comments page

    return (
        <div className="w-full h-full">
            <PostPageComponent post={post} />
        </div>
    );
}

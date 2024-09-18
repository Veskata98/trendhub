import prisma from '@/lib/db';

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
        },
    });

    console.log(post);

    return <div className="w-full">page</div>;
}

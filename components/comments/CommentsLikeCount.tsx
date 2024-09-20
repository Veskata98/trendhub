import { CommentLike } from '@prisma/client';

type CommentLikeCountProps = {
    likes: CommentLike[];
};

export const CommentLikeCount = ({ likes }: CommentLikeCountProps) => {
    const number = likes.map((like) => (like.type === 'LIKE' ? 1 : -1)).reduce((a, x) => a + x, 0);
    return <span className="font-bold text-sm sm:text-base">{number}</span>;
};

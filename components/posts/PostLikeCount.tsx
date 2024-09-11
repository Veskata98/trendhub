import { Like } from '@prisma/client';

type PostLikeCountProps = {
    likes: Like[];
};

export const PostLikeCount = ({ likes }: PostLikeCountProps) => {
    const number = likes.map((like) => (like.type === 'LIKE' ? 1 : -1)).reduce((a, x) => a + x, 0);
    return <span className="font-bold text-sm sm:text-base">{number}</span>;
};

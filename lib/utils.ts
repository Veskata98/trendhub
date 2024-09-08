import { Like } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface BasePost {
    id: string;
    likes: Like[];
}

export const updateVotes = <T extends BasePost>(
    posts: T[],
    postId: string,
    resultData: any,
    username: string | null | undefined
): T[] => {
    return posts.map((post) => {
        if (post.id !== postId) return post;

        // Remove existing like/dislike by the current user
        post.likes = post.likes.filter((like) => like.username !== username);

        if (resultData) {
            // Add new like/dislike if resultData is available
            post.likes.push(resultData);
        }

        return post;
    });
};

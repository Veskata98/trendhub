import { User } from '@clerk/nextjs/server';
import { Like, Post, Trend } from '@prisma/client';

export interface ServerUser extends User {
    username: string;
}

export type UserStatus = 'owner' | 'member' | 'nonMember' | 'guest';

export interface PostWithTrendAndLikes extends Post {
    trend: {
        image_url: string;
        name: string;
    };
    likes: Like[];
}

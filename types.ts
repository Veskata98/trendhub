import { User } from '@clerk/nextjs/server';
import { Like, Post } from '@prisma/client';

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

export interface PostWithCreatorAvatarAndLikes extends Post {
    creator: {
        image_url: string;
    };
    likes: Like[];
}

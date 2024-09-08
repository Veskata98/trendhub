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

export interface PostWithCreatorAvatarAndLikes extends Post {
    creator: {
        image_url: string;
    };
    likes: Like[];
}

export interface ExtentedPost extends Post {
    trend?: {
        image_url: string;
        name: string;
    };
    creator?: {
        image_url: string;
    };
    likes: Like[];
}

export interface TrendWithPostsAndMembers extends Trend {
    members: {
        profile_username: string;
    }[];
    posts: Post[];
    creator: {
        image_url: string;
    };
}

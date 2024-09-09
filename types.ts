import { User } from '@clerk/nextjs/server';
import { Like, Post, Trend } from '@prisma/client';

export interface ServerUser extends User {
    username: string;
}

export type UserStatus = 'owner' | 'member' | 'nonMember' | 'guest';

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

export interface PostWithCreatorAvatarAndLikes extends Post {
    creator: {
        image_url: string;
    };
    likes: Like[];
}

export interface TrendWithMembers extends Trend {
    members: {
        profile_username: string;
    }[];
    creator: {
        image_url: string;
    };
}

export interface TrendWithMembers extends Trend {
    members: {
        profile_username: string;
    }[];
}

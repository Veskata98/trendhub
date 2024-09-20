import { User } from '@clerk/nextjs/server';
import { Comment, CommentLike, Like, Post, Trend } from '@prisma/client';

export interface ServerUser extends User {
    username: string;
}

export type UserStatus = 'owner' | 'member' | 'nonMember' | 'guest';

export interface ExtendedPost extends Post {
    trend?: {
        image_url: string;
        name: string;
    };
    creator?: {
        image_url: string;
    };
    likes: Like[];
    _count: {
        comments: number;
    };
}

export interface ExtendedPostWithMandatoryTrendName extends Omit<ExtendedPost, 'trend'> {
    trend: {
        image_url: string;
    };
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

export type PostCardPageType = 'profile' | 'trend' | 'home';

export interface ExtendedComment extends Comment {
    replies: ExtendedComment[];
    creator?: {
        image_url: string;
    };
    likes: CommentLike[];
}

export interface ProfilePageComments extends Comment {
    likes: CommentLike[];
    post: {
        title: string;
        trend: Trend;
    };
}

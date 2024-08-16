import { User } from '@clerk/nextjs/server';

export interface ServerUser extends User {
    username: string;
}

export type UserStatus = 'owner' | 'member' | 'nonMember';

import Image from 'next/image';
import { LogoutButton } from './LogoutButton';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

type ProfileInfoProps = {
    username: string;
};

export const ProfileInfo = async ({ username }: ProfileInfoProps) => {
    const profile = await prisma.profile.findFirst({ where: { username } });

    if (!profile) {
        redirect('/');
    }

    return (
        <div className="flex flex-col items-center gap-2 mb-4">
            <Image
                className="rounded-full object-cover object-center"
                src={profile.image_url || '/no-avatar.png'}
                width={164}
                height={164}
                alt="user_avatar"
            />
            <h2 className="font-semibold">{profile.username}</h2>
        </div>
    );
};

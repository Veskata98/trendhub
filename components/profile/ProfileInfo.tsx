import Image from 'next/image';

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

    const nameToShow = profile.first_name ? `${profile.first_name} ${profile.last_name}` : profile.username;

    return (
        <div className="flex flex-col items-center gap-2 mb-4">
            <Image
                className="rounded-full object-cover object-center"
                src={profile.image_url || '/no-avatar.png'}
                width={100}
                height={100}
                alt="user_avatar"
            />
            <h2 className="font-semibold">{nameToShow}</h2>
        </div>
    );
};

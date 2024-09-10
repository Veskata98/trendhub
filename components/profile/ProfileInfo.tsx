import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { ProfileAvatar } from './profile-avatar/ProfileAvatar';
import serverUser from '@/lib/serverUser';

type ProfileInfoProps = {
    username: string;
};

export const ProfileInfo = async ({ username }: ProfileInfoProps) => {
    const profile = await prisma.profile.findFirst({ where: { username } });

    if (!profile) {
        redirect('/');
    }

    const nameToShow = profile.first_name ? `${profile.first_name} ${profile.last_name}` : profile.username;

    const user = await serverUser();
    const canEdit = user?.username === username;

    return (
        <div className="flex flex-col items-center gap-2 pt-4">
            <ProfileAvatar canEdit={canEdit} src={profile.image_url} username={profile.username} />
            <h2 className="font-semibold">{nameToShow}</h2>
        </div>
    );
};

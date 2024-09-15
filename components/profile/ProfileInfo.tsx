import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { ProfileAvatar } from './profile-avatar/ProfileAvatar';
import serverUser from '@/lib/serverUser';
import { ProfileName } from './ProfileName';

type ProfileInfoProps = {
    username: string;
};

export const ProfileInfo = async ({ username }: ProfileInfoProps) => {
    const profile = await prisma.profile.findFirst({ where: { username } });

    if (!profile) {
        redirect('/');
    }
    const user = await serverUser();
    const canEdit = user?.username === username;

    return (
        <div className="flex flex-col items-center gap-2 py-4">
            <ProfileAvatar canEdit={canEdit} src={profile.image_url} username={profile.username} />
            <ProfileName username={username} />
        </div>
    );
};

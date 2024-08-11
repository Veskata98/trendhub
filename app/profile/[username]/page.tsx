import { ChangeAvatar } from '@/components/profile/ChangeAvatar';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { UserStatSidebar } from '@/components/profile/right-sidebar/UserStatSidebar';
import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

type ProfilePageProps = {
    params: {
        username: string;
    };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
    const profile = await prisma.profile.findFirst({ where: { username: params.username } });

    if (!profile) {
        redirect('/');
    }

    const user = await currentUser();
    const canEdit = user?.username === profile.username;

    return (
        <div className="flex p-4 w-full justify-between xl:justify-center gap-4">
            <div className="flex-1 xl:flex-none">
                <ProfileInfo username={params.username} />
                {canEdit && <ChangeAvatar />}
            </div>
            <UserStatSidebar username={params.username} />
        </div>
    );
}

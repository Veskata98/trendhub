import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { CopyProfileUrlButton } from './CopyProfileUrlButton';
import { AuraSection } from './AuraSection';
import { currentUser } from '@clerk/nextjs/server';
import { JoinDate } from './JoinDate';
import { Separator } from '@/components/ui/separator';
import { DeleteProfileButton } from './DeleteProfileButton';

type UserStatSidebarProps = {
    username: string;
};

export const UserStatSidebar = async ({ username }: UserStatSidebarProps) => {
    const profile = await prisma.profile.findFirst({ where: { username } });

    if (!profile) {
        redirect('/');
    }

    const user = await currentUser();
    const canEdit = user?.username === profile.username;

    return (
        <aside
            className="text-white rounded-xl flex-col gap-8 w-80 hidden lg:flex pt-12 
        bg-gradient-to-t from-primary-400/90 via-violet-600/90 to-black/80 p-4 sticky top-0"
        >
            <div className="mx-auto text-center space-y-1">
                <p className="font-semibold">{profile.username}</p>
                <CopyProfileUrlButton />
            </div>
            <AuraSection username={username} />
            <Separator className="bg-zinc-100" />
            <JoinDate joinDate={profile.created_at.toISOString()} />
            {canEdit && <DeleteProfileButton />}
        </aside>
    );
};

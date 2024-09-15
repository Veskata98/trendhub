import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { CopyProfileUrlButton } from './CopyProfileUrlButton';
import { AuraSection } from './AuraSection';
import { JoinDate } from './JoinDate';
import { Separator } from '@/components/ui/separator';
import { DeleteProfileButton } from './DeleteProfileButton';
import { MobileProfileName } from './mobile/MobileProfileName';
import { MobileAuraSection } from './mobile/MobileAuraSection';
import serverUser from '@/lib/serverUser';

type ProfileRightSidebarProps = {
    username: string;
    smallDisplay?: boolean;
};

export const ProfileRightSidebar = async ({ username, smallDisplay = false }: ProfileRightSidebarProps) => {
    const profile = await prisma.profile.findFirst({ where: { username } });

    if (!profile) {
        redirect('/');
    }

    const user = await serverUser();
    const canEdit = user?.username === profile.username;

    const nameToShow = profile.first_name ? `${profile.first_name} ${profile.last_name}` : profile.username;

    if (smallDisplay) {
        return (
            <div className=" space-y-4 bg-zinc-100/40 dark:bg-zinc-700/40 rounded-xl w-full flex-col flex lg:hidden py-6">
                <div className="justify-around items-center space-y-1 flex">
                    <MobileProfileName username={nameToShow} />
                    <JoinDate className="text-xs font-normal lowercase" joinDate={profile.created_at.toISOString()} />
                </div>
                <Separator className="dark:bg-white bg-zinc-600 w-[90%] mx-auto" />
                <MobileAuraSection username={username} />
            </div>
        );
    }

    return (
        <aside
            className="text-white rounded-xl flex-col gap-8 w-80 hidden lg:flex pt-12 
        bg-gradient-to-t from-primary-600/90 via-violet-700/90 to-black/80 p-4 sticky top-0"
        >
            <div className="mx-auto text-center space-y-2">
                <p className="font-semibold">{nameToShow}</p>
                <CopyProfileUrlButton />
            </div>
            <AuraSection username={username} />
            <Separator className="bg-zinc-100" />
            <JoinDate className="font-normal" joinDate={profile.created_at.toISOString()} />
            {canEdit && <DeleteProfileButton username={username} />}
        </aside>
    );
};

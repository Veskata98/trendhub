import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { CopyProfileUrlButton } from './CopyProfileUrlButton';
import { AuraSection } from './AuraSection';
import { currentUser } from '@clerk/nextjs/server';

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
        <aside className="text-white rounded-xl flex-col gap-8 w-80 hidden lg:flex pt-12 bg-gradient-to-t from-primary-500/90 via-purple-500/90 to-rose-500/90 p-4">
            <div className="mx-auto text-center space-y-1">
                <p>{profile.username}</p>
                <CopyProfileUrlButton />
            </div>
            <AuraSection createdAtDate={profile.created_at.toLocaleDateString()} />
            {canEdit && (
                <button className="bg-red-500 w-full text-white py-2 px-4 rounded transition duration-200 ease-out hover:bg-red-600">
                    Delete account
                </button>
            )}
        </aside>
    );
};

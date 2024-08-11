import { redirect } from 'next/navigation';
import { CopyProfileUrlButton } from './CopyProfileUrlButton';
import prisma from '@/lib/db';

type UserStatSidebarProps = {
    username: string;
};

export const UserStatSidebar = async ({ username }: UserStatSidebarProps) => {
    const profile = await prisma.profile.findFirst({ where: { username } });

    if (!profile) {
        redirect('/');
    }

    return (
        <aside className="flex-col gap-2 w-80 hidden md:flex">
            UserStatSidebar
            <CopyProfileUrlButton />
            <button className="bg-red-500 w-full text-white py-2 px-4 rounded transition duration-200 ease-out hover:bg-red-600">
                Delete account
            </button>
        </aside>
    );
};

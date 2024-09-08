import { ProfileActivitySection } from '@/components/profile/profile-activity-section/ProfileActivitySection';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { UserStatSidebar } from '@/components/profile/right-sidebar/UserStatSidebar';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function UsernameLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: { username: string; activity: string };
}) {
    const username = params.username;

    const profile = await prisma.profile.findFirst({ where: { username } });

    if (!profile) {
        redirect('/');
    }

    return (
        <section className="flex p-4 w-full justify-between xl:justify-center gap-4 overflow-y-auto">
            <div className="w-full xl:w-auto flex-1">
                <ProfileInfo username={username} />
                <>
                    <ProfileActivitySection username={username} />
                    {children}
                </>
            </div>
            <UserStatSidebar username={username} />
        </section>
    );
}

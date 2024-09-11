import { ProfileActivitySection } from '@/components/profile/profile-activity-section/ProfileActivitySection';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { MobileRightSidebar } from '@/components/profile/right-sidebar/mobile/MobileRightSidebar';
import { ProfileRightSidebar } from '@/components/profile/right-sidebar/ProfileRightSidebar';
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
        <section className="flex p-4 px-2 md:px-4 w-full justify-between xl:justify-center gap-4">
            <div className="w-full xl:w-auto flex-1 scroll-hidden space-y-2">
                <ProfileInfo username={profile.username} />
                <MobileRightSidebar username={profile.username} />
                <>
                    <ProfileActivitySection username={profile.username} />
                    {children}
                </>
            </div>
            <ProfileRightSidebar username={profile.username} />
        </section>
    );
}

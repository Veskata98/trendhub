import Link from 'next/link';
import { NavbarUser } from './NavbarUser';

import { currentUser } from '@clerk/nextjs/server';
import { SignInButton } from '@clerk/nextjs';
import prisma from '@/lib/db';

export const Navbar = async () => {
    const user = await currentUser();
    const profile = await prisma.profile.findFirst({ where: { username: user?.username || '' } });

    return (
        <nav className="h-[56px] bg-primary-500 px-8">
            <div className="w-full lg:w-2/3 mx-auto h-full">
                <div className="flex justify-between items-center h-full">
                    <Link href="/" className="font-semibold text-xl">
                        TrendHub
                    </Link>

                    {user ? (
                        <NavbarUser profilePicture={profile?.image_url || null} username={user.username || ''} />
                    ) : (
                        <SignInButton />
                    )}
                </div>
            </div>
        </nav>
    );
};

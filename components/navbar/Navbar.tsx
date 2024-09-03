import Link from 'next/link';
import { NavbarUser } from './NavbarUser';

import { SignInButton, SignUpButton } from '@clerk/nextjs';
import prisma from '@/lib/db';
import { DarkModeToggle } from '../other/DarkModeToggle';
import { CreateTrend } from '../trends/create-trend/CreateTrend';
import serverUser from '@/lib/serverUser';

export const Navbar = async () => {
    const user = await serverUser();
    const profile = await prisma.profile.findFirst({ where: { username: user?.username || '' } });

    return (
        <nav className="h-[56px] bg-primary-500 px-8 text-white">
            <div className="w-full lg:w-2/3 mx-auto h-full">
                <div className="flex justify-between items-center h-full">
                    <Link href="/" className="font-semibold text-xl">
                        TrendHub
                    </Link>
                    <div className="flex justify-center gap-4">
                        <DarkModeToggle className="hidden md:flex" />
                        {user && <CreateTrend />}

                        {user ? (
                            <NavbarUser profilePicture={profile?.image_url || null} username={user.username || ''} />
                        ) : (
                            <div className="flex gap-2 justify-center text-sm">
                                <SignInButton>
                                    <div className="px-4 py-2 rounded-md hover:bg-primary-600 cursor-pointer">
                                        Sign in
                                    </div>
                                </SignInButton>
                                <SignUpButton>
                                    <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer">
                                        Sign up
                                    </div>
                                </SignUpButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

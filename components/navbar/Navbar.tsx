import Link from 'next/link';
import { NavbarUser } from './NavbarUser';

import { SignInButton, SignUpButton } from '@clerk/nextjs';
import prisma from '@/lib/db';
import { DarkModeToggle } from '../other/DarkModeToggle';
import serverUser from '@/lib/serverUser';
import { CreateTrendButton } from './CreateTrendButton';
import MobileMenu from './mobile-menu/MobileMenu';
import { LeftSidebar } from '../left-sidebar/LeftSidebar';

export const Navbar = async () => {
    const user = await serverUser();
    const profile = await prisma.profile.findFirst({ where: { username: user?.username || '' } });

    return (
        <nav className="h-[56px] bg-violet-500 px-4 md:px-8 text-white">
            <div className="w-full lg:w-2/3 mx-auto h-full">
                <div className="flex justify-between items-center h-full">
                    <div className="flex items-center gap-3">
                        <MobileMenu>
                            <LeftSidebar className="!w-full block scroll-hidden" />
                        </MobileMenu>
                        <Link href="/" className="font-semibold text-xl">
                            TrendIt
                        </Link>
                    </div>
                    <div className="flex justify-center gap-4">
                        <DarkModeToggle className="hidden md:flex" />
                        {(profile || user) && (
                            <div className="hidden md:block">
                                <CreateTrendButton />
                            </div>
                        )}

                        {profile || user ? (
                            <NavbarUser
                                profilePicture={profile?.image_url || user?.imageUrl || null}
                                username={profile?.username || user?.username || ''}
                            />
                        ) : (
                            <div className="flex gap-2 justify-center text-sm">
                                <SignInButton>
                                    <div className="px-4 py-2 rounded-md hover:bg-primary-600 cursor-pointer">
                                        Sign in
                                    </div>
                                </SignInButton>
                                <SignUpButton>
                                    <div className="bg-gray-200 text-primary-800 px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer">
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

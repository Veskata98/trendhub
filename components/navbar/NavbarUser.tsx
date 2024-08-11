'use client';

import Image from 'next/image';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import Link from 'next/link';

import { DarkModeToggle } from '../DarkModeToggle';
import { Separator } from '../ui/separator';
import { LogOut, User } from 'lucide-react';
import { useTheme } from 'next-themes';

type NavbarUserProps = {
    profilePicture: string | null;
    username: string;
};

export const NavbarUser = ({ profilePicture, username }: NavbarUserProps) => {
    const { theme } = useTheme();

    return (
        <div className="relative cursor-pointer">
            <Popover>
                <PopoverTrigger asChild>
                    <div>
                        <Image
                            src={profilePicture || '/no-avatar.png'}
                            alt=""
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-60 dark:bg-zinc-700 bg-zinc-100 py-1">
                    <div className="flex flex-col text-sm w-full">
                        <Link href={`/profile/${username}`} className="w-full flex gap-2 items-center h-12">
                            <User width={18} height={18} />
                            View Profile
                        </Link>

                        <Separator className="dark:bg-slate-600" />
                        <div className="flex items-center gap-4 h-12">
                            {theme === 'dark' ? <p>Dark Mode</p> : <p>Light Mode</p>}
                            <DarkModeToggle />
                        </div>

                        <Separator className="dark:bg-slate-600" />

                        <Link href="/api/auth/logout" className="w-full flex gap-2 h-12 items-center">
                            <LogOut width={18} height={18} />
                            Log Out
                        </Link>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

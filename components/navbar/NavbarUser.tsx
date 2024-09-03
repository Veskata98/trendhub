'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import Link from 'next/link';

import { DarkModeToggle } from '../other/DarkModeToggle';
import { Separator } from '../ui/separator';
import { LogOut, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SignOutButton } from '@clerk/nextjs';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type NavbarUserProps = {
    profilePicture: string | null;
    username: string;
};

export const NavbarUser = ({ profilePicture, username }: NavbarUserProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();

    return (
        <div className="my-auto cursor-pointer">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild onClick={() => setIsOpen(true)}>
                    <div>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={profilePicture || ''} alt="trend_avatar" />
                            <AvatarFallback>{username.at(0)?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-screen sm:w-60 dark:bg-zinc-700 bg-zinc-100 py-2">
                    <div className="flex flex-col text-sm w-full">
                        <div className="w-full flex gap-2 h-12 items-center justify-center">
                            <p className="font-semibold">{username}</p>
                        </div>
                        <Separator className="dark:bg-slate-600" />

                        <div className="rounded hover:bg-zinc-200 dark:hover:bg-zinc-600">
                            <Link
                                href={`/profile/${username}`}
                                onClick={() => setIsOpen(false)}
                                className="w-full flex gap-2 items-center h-12"
                            >
                                <User width={18} height={18} />
                                View Profile
                            </Link>
                        </div>
                        <Separator className="dark:bg-slate-600" />

                        <div className="block md:hidden">
                            <div className="flex items-center gap-4 h-12">
                                {theme === 'dark' ? <p>Dark Mode</p> : <p>Light Mode</p>}
                                <DarkModeToggle className="hover:bg-zinc-300 dark:hover:bg-zinc-600" />
                            </div>
                            <Separator className="dark:bg-slate-600" />
                        </div>

                        <div className="w-full flex gap-2 h-12 items-center cursor-pointer rounded hover:bg-zinc-200 dark:hover:bg-zinc-600">
                            <LogOut width={18} height={18} />
                            <SignOutButton>
                                <p>Log Out</p>
                            </SignOutButton>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import Link from 'next/link';

import { DarkModeToggle } from '../other/DarkModeToggle';
import { Separator } from '../ui/separator';
import { LogOut, User, UserX } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SignOutButton } from '@clerk/nextjs';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CreateTrendButton } from './CreateTrendButton';
import { useModal } from '@/hooks/useModalStore';

type NavbarUserProps = {
    profilePicture: string | null;
    username: string;
};

export const NavbarUser = ({ profilePicture, username }: NavbarUserProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();
    const { onOpen } = useModal();

    return (
        <div className="my-auto cursor-pointer">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild onClick={() => setIsOpen(true)}>
                    <div>
                        <Avatar className="h-8 w-8 shadow">
                            {profilePicture ? (
                                <AvatarImage src={profilePicture} alt="user_avatar" />
                            ) : (
                                <AvatarFallback>{username.at(0)?.toUpperCase()}</AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-screen sm:w-60 dark:bg-zinc-700 bg-zinc-100 py-2 mt-2 px-0">
                    <div className="flex flex-col text-sm w-full items-center sm:items-start">
                        <div className="w-full flex gap-2 h-12 items-center justify-center">
                            <p className="font-semibold">{username}</p>
                        </div>
                        <Separator className="dark:bg-zinc-600" />

                        <div className="px-4 hover:bg-zinc-200 dark:hover:bg-zinc-600 w-full">
                            <Link
                                href={`/profile/${username}`}
                                onClick={() => setIsOpen(false)}
                                className="w-full flex gap-2 items-center h-12 justify-center sm:justify-start"
                            >
                                <User width={18} height={18} />
                                View Profile
                            </Link>
                        </div>
                        <Separator className="dark:bg-zinc-600" />

                        <div
                            className="flex md:hidden w-full flex-col items-center sm:items-start
                     hover:bg-zinc-300 dark:hover:bg-zinc-600"
                        >
                            <div onClick={() => setIsOpen(false)} className="px-4 w-full flex items-center gap-4 h-12">
                                <CreateTrendButton smallDisplay={true} />
                            </div>
                            <Separator className="dark:bg-zinc-600" />
                        </div>

                        <div className="flex md:hidden w-full flex-col items-center sm:items-start">
                            <div className="px-4 flex items-center gap-4 h-12">
                                {theme === 'dark' ? (
                                    <p className="hidden sm:block">Dark Mode</p>
                                ) : (
                                    <p className="hidden sm:block">Light Mode</p>
                                )}
                                <DarkModeToggle className="hover:bg-zinc-300 dark:hover:bg-zinc-600" />
                            </div>
                            <Separator className="dark:bg-zinc-600" />
                        </div>

                        <SignOutButton redirectUrl="/">
                            <div
                                className="px-4 w-full flex gap-2 h-12 items-center justify-center 
                                sm:justify-start cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600"
                            >
                                <LogOut width={18} height={18} />
                                <p>Log Out</p>
                            </div>
                        </SignOutButton>

                        <div className="block lg:hidden w-full">
                            <Separator className="dark:bg-zinc-600" />
                            <div
                                onClick={() => onOpen('deleteProfile', { username })}
                                className="px-4 w-full flex gap-2 h-12 items-center justify-center 
                            sm:justify-start cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600"
                            >
                                <UserX width={18} height={18} className="text-rose-500" />
                                <p className="text-rose-500">Delete Profile</p>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

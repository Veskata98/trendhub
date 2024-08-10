'use client';

import Image from 'next/image';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui/button';
import Link from 'next/link';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { DarkModeToggle } from '../DarkModeToggle';

type NavbarUserProps = {
    profilePicture: string | null;
};

export const NavbarUser = ({ profilePicture }: NavbarUserProps) => {
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
                <PopoverContent className="w-60 dark:bg-zinc-700 bg-zinc-100">
                    <div className="flex flex-col gap-4 text-sm">
                        <div>
                            <Link href={`/profile`} className="w-full">
                                View Profile
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <p>Dark Mode</p>
                            <DarkModeToggle />
                        </div>

                        <div>
                            <LogoutLink>Log Out</LogoutLink>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

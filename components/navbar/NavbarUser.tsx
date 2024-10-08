"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import Link from "next/link";

import { DarkModeToggle } from "../other/DarkModeToggle";
import { Separator } from "../ui/separator";
import { LogOut, User, UserX } from "lucide-react";
import { useTheme } from "next-themes";
import { SignOutButton } from "@clerk/nextjs";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CreateTrendButton } from "./CreateTrendButton";
import { useModal } from "@/hooks/useModalStore";

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
                                <AvatarImage
                                    src={profilePicture}
                                    alt="user_avatar"
                                />
                            ) : (
                                <AvatarFallback>
                                    {username.at(0)?.toUpperCase()}
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="mt-2 w-screen bg-zinc-100 px-0 py-2 dark:bg-zinc-700 sm:w-60">
                    <div className="flex w-full flex-col items-center text-sm sm:items-start">
                        <div className="flex h-12 w-full items-center justify-center gap-2">
                            <p className="font-semibold">{username}</p>
                        </div>
                        <Separator className="dark:bg-zinc-600" />

                        <div className="w-full px-4 hover:bg-zinc-200 dark:hover:bg-zinc-600">
                            <Link
                                href={`/profile/${username}`}
                                onClick={() => setIsOpen(false)}
                                className="flex h-12 w-full items-center justify-center gap-2 sm:justify-start"
                            >
                                <User width={18} height={18} />
                                View Profile
                            </Link>
                        </div>
                        <Separator className="dark:bg-zinc-600" />

                        <div className="flex w-full flex-col items-center hover:bg-zinc-300 dark:hover:bg-zinc-600 sm:items-start md:hidden">
                            <div
                                onClick={() => setIsOpen(false)}
                                className="flex h-12 w-full items-center gap-4 px-4"
                            >
                                <CreateTrendButton smallDisplay={true} />
                            </div>
                            <Separator className="dark:bg-zinc-600" />
                        </div>

                        <div className="flex w-full flex-col items-center sm:items-start md:hidden">
                            <div className="flex h-12 items-center gap-4 px-4">
                                {theme === "dark" ? (
                                    <p className="hidden sm:block">Dark Mode</p>
                                ) : (
                                    <p className="hidden sm:block">
                                        Light Mode
                                    </p>
                                )}
                                <DarkModeToggle className="hover:bg-zinc-300 dark:hover:bg-zinc-600" />
                            </div>
                            <Separator className="dark:bg-zinc-600" />
                        </div>

                        <SignOutButton redirectUrl="/">
                            <div className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 px-4 hover:bg-zinc-200 dark:hover:bg-zinc-600 sm:justify-start">
                                <LogOut width={18} height={18} />
                                <p>Log Out</p>
                            </div>
                        </SignOutButton>

                        <div className="block w-full lg:hidden">
                            <Separator className="dark:bg-zinc-600" />
                            <div
                                onClick={() =>
                                    onOpen("deleteProfile", { username })
                                }
                                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 px-4 hover:bg-zinc-200 dark:hover:bg-zinc-600 sm:justify-start"
                            >
                                <UserX
                                    width={18}
                                    height={18}
                                    className="text-rose-500"
                                />
                                <p className="text-rose-500">Delete Profile</p>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

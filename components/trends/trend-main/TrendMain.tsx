'use client';

import { PostFeed } from '@/components/posts/PostFeed';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ExtendedPost, TrendWithMembers, UserStatus } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TrendStatusButton from './TrendStatusButton';
import TrendInfo from './TrendInfo';

type TrendMainProps = {
    trend: TrendWithMembers;
    posts: ExtendedPost[];
    userStatus: UserStatus;
};

export const TrendMain = ({ trend, posts, userStatus }: TrendMainProps) => {
    const [show, setShow] = useState<'feed' | 'info'>('feed');

    useEffect(() => {
        // Function to check window width and update state
        const checkWidth = () => {
            if (window.innerWidth > 1024) {
                setShow('feed');
            }
        };

        // Check width on initial render
        checkWidth();

        // Add event listener for window resize
        window.addEventListener('resize', checkWidth);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', checkWidth);
        };
    }, []);

    return (
        <div className="space-y-2">
            <div
                className="flex justify-between lg:justify-end items-center border-b-[1px] 
            border-zinc-300/50 dark:border-zinc-700/50"
            >
                <div className="pl-2 py-2 lg:hidden">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShow('feed')}
                        className={cn('rounded-3xl', show === 'feed' && 'dark:bg-zinc-500 dark:hover:bg-zinc-500')}
                    >
                        Feed
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShow('info')}
                        className={cn('rounded-3xl', show === 'info' && 'dark:bg-zinc-500 dark:hover:bg-zinc-500')}
                    >
                        Info
                    </Button>
                </div>
                <TrendStatusButton trendName={trend.name} userStatus={userStatus} />
            </div>

            {show === 'feed' ? (
                <PostFeed trendName={trend.name} initialPosts={posts} pageType="trend" />
            ) : (
                <TrendInfo trend={trend} />
            )}
        </div>
    );
};

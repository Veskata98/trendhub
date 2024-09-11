'use client';

import { PostFeed } from '@/components/posts/PostFeed';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ExtendedPost, TrendWithMembers, UserStatus } from '@/types';
import { useEffect, useState } from 'react';
import TrendStatusButton from './TrendStatusButton';
import TrendInfo from './TrendInfo';
import EditFeed from '@/components/sort-search-feed/EditFeed';

type TrendMainProps = {
    trend: TrendWithMembers;
    posts: ExtendedPost[];
    userStatus: UserStatus;
    searchTerm?: string;
    sort?: 'hot' | 'new' | 'top';
};

export const TrendMain = ({ trend, posts, userStatus, searchTerm, sort }: TrendMainProps) => {
    const [show, setShow] = useState<'feed' | 'info'>('feed');

    useEffect(() => {
        const checkWidth = () => {
            if (window.innerWidth > 1024) {
                setShow('feed');
            }
        };

        checkWidth();

        window.addEventListener('resize', checkWidth);

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
                <>
                    <EditFeed className="!w-full" />
                    <PostFeed
                        trendName={trend.name}
                        initialPosts={posts}
                        pageType="trend"
                        searchTerm={searchTerm}
                        sort={sort}
                    />
                </>
            ) : (
                <TrendInfo trend={trend} />
            )}
        </div>
    );
};

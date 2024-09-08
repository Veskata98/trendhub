'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LIST_ITEMS = { Summary: '', Posts: 'posts', Comments: 'comments', Upvotes: 'upvotes', Downvotes: 'downvotes' };

type Links =
    | {
          Summary: string;
          Posts: string;
          Comments: string;
          Upvotes: string;
          Downvotes: string;
      }
    | {
          Summary: string;
          Posts: string;
          Comments: string;
      };

export const ActivityLinks = ({ links, username }: { links: Links; username: string }) => {
    const path = usePathname();
    const activity = path.split('/').pop();

    const activeLink = Object.values(LIST_ITEMS).find((x) => x === activity) || '';

    return (
        <ul
            className={cn(
                'flex gap-1 md:gap-4 justify-center p-1 overflow-x-scroll text-sm',
                Object.values(links).length === 5 && 'justify-start sm:justify-center'
            )}
        >
            {Object.entries(links).map(([key, value]) => (
                <li
                    className={cn('px-4 py-2', value === activeLink && 'bg-slate-200 dark:bg-zinc-500 rounded-3xl')}
                    key={key}
                >
                    <Link className="hover:underline" href={`/profile/${username}${value ? '/' + value : ''}`}>
                        {key}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

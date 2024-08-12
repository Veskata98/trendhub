import { cn } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

const LIST_ITEMS = { Overall: '', Posts: 'posts', Comments: 'comments', Upvotes: 'upvotes', Downvotes: 'downvotes' };
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const ProfileMainSection = async ({ username, activity }: { username: string; activity?: string }) => {
    const activeLink = Object.values(LIST_ITEMS).find((x) => x === activity) || '';

    const user = await currentUser();
    const canEdit = user?.username === username;

    const links = canEdit ? LIST_ITEMS : { Overall: '', Posts: 'posts', Comments: 'comments' };

    return (
        <div className="p-2 py-4">
            <div>
                <ul className="flex gap-4 justify-center p-1">
                    {Object.entries(links).map(([key, value]) => (
                        <li
                            className={cn(
                                'px-4 py-2',
                                value === activeLink && 'bg-slate-200 dark:bg-zinc-500 rounded-3xl'
                            )}
                            key={key}
                        >
                            <Link
                                className="hover:underline"
                                href={`${BASE_URL}/profile/${username}${!value ? '' : '/' + value}`}
                            >
                                {key}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

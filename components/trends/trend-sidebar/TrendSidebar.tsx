import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { TrendWithMembers } from '@/types';
import Link from 'next/link';

type TrendSidebarProps = {
    trend: TrendWithMembers;
};

export const TrendSidebar = async ({ trend }: TrendSidebarProps) => {
    return (
        <aside
            className="text-white rounded-xl flex-col gap-8 w-72 2xl:w-80 hidden lg:flex pt-12 
         bg-zinc-800 dark:bg-zinc-900 shadow p-4 sticky top-0"
        >
            <div className="space-y-6">
                <div>
                    <h2 className="font-bold">t/{trend.name}</h2>
                    <p className="text-sm">{trend.description}</p>
                </div>
                <Separator className="bg-zinc-500" />
                <div className="flex flex-col items-center">
                    <p className="font-semibold">{trend.members.length + 1}</p>
                    <span className="text-sm font-semibold">Members</span>
                </div>
                <Separator className="bg-zinc-500" />
                <div className="space-y-3">
                    <h6 className="text-center text-sm">Creator</h6>
                    <Link href={`/profile/${trend.creator_name}`} className="flex flex-col items-center">
                        <Avatar className="h-10 w-10 shadow">
                            {trend.creator.image_url ? (
                                <AvatarImage src={trend.creator.image_url} alt="user_avatar" />
                            ) : (
                                <AvatarFallback>{trend.creator_name.at(0)?.toUpperCase()}</AvatarFallback>
                            )}
                        </Avatar>
                        <p className="font-semibold text-sm">{trend.creator_name}</p>
                    </Link>
                </div>
            </div>
        </aside>
    );
};

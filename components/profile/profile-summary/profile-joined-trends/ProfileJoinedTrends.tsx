import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import serverUser from '@/lib/serverUser';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { JoinedActionButton } from './JoinedActionButton';

export const ProfileJoinedTrends = async ({ username }: { username: string }) => {
    const user = await serverUser();
    const profile = await prisma.profile.findUnique({ where: { username } });

    if (!profile) {
        redirect('/');
    }

    const joinedTrends = await prisma.trend.findMany({
        where: {
            members: {
                some: {
                    profile_username: username,
                },
            },
        },
        include: {
            members: {
                select: {
                    profile_username: true,
                },
            },
            creator: {
                select: {
                    image_url: true,
                },
            },
        },
    });

    return (
        <div className="p-1 space-y-1">
            <h2 className="font-semibold text-sm md:text-base">Joined trends</h2>
            <Separator className="dark:bg-zinc-200 bg-zinc-800" />
            {joinedTrends.length ? (
                <ul>
                    {joinedTrends.map((trend) => (
                        <li key={trend.name} className="flex justify-between items-center p-2 px-0 lg:px-2">
                            <Link href={`/t/${trend.name}`} className="flex gap-2 items-center p-2 w-1/3">
                                <Avatar className="shadow w-8 h-8">
                                    <AvatarImage src={trend.image_url} alt="trend_image" />
                                </Avatar>
                                <span className="font-semibold text-sm">t/{trend.name}</span>
                            </Link>
                            <span className="text-sm font-semibold w-1/3">{trend.members.length + 1} members</span>
                            <JoinedActionButton currentUserUsername={user?.username} trend={trend} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="w-full min-h-28 flex justify-center items-center text-muted-foreground">
                    <p className="font-semibold text-sm md:text-base">You haven&apos;t joined any trends yet</p>
                </div>
            )}
        </div>
    );
};

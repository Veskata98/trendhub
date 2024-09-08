import prisma from '@/lib/db';
import { TrendListElement } from '../TrendListElement';
import serverUser from '@/lib/serverUser';
import { Separator } from '../../ui/separator';

export const JoinedTrendList = async () => {
    const user = await serverUser();

    if (!user) {
        return null;
    }

    const trends = await prisma.trend.findMany({
        where: {
            members: {
                some: {
                    profile_username: user.username,
                },
            },
        },
        take: 5,
        orderBy: { created_at: 'desc' },
    });

    if (!trends.length) {
        return null;
    }

    return (
        <div className="p-4 py-2 flex flex-col gap-2">
            <h2 className="font-semibold">Joined trends</h2>
            <Separator className="h-[1px] bg-zinc-600" />
            <ul>
                {trends.map((trend) => (
                    <li key={trend.name} className="hover:bg-zinc-100 rounded dark:hover:bg-zinc-600">
                        <TrendListElement trend={trend} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

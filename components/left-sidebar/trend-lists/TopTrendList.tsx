import prisma from '@/lib/db';
import { TrendListElement } from '../TrendListElement';
import { Separator } from '../../ui/separator';

export const TopTrendList = async () => {
    const trends = await prisma.trend.findMany({ orderBy: { members: { _count: 'desc' } }, take: 5 });

    return (
        <div className="p-4 py-2 flex flex-col gap-2">
            <h2 className="font-semibold">Top trends</h2>
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

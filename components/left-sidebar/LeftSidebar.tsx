import prisma from '@/lib/db';
import Link from 'next/link';
import { Separator } from '../ui/separator';

export const LeftSidebar = async () => {
    const trends = await prisma.trend.findMany({ orderBy: { created_at: 'desc' } });

    return (
        <aside className="w-72 h-full hidden xl:block">
            <div className="p-4 flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Latest trends</h2>
                <Separator className="h-[1px] bg-zinc-300" />
                <ul>
                    {trends.map((trend) => (
                        <li key={trend.name}>
                            <Link href={`/t/${trend.name}`}>{trend.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

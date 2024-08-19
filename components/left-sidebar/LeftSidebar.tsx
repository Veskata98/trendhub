import prisma from '@/lib/db';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { TrendList } from './TrendList';

export const LeftSidebar = async () => {
    return (
        <aside className="w-72 h-full hidden xl:block">
            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">New trends</h2>
                <Separator className="h-[1px] bg-zinc-600" />
                <TrendList />
            </div>
        </aside>
    );
};

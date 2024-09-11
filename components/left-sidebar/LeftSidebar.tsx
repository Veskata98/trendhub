import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { JoinedTrendList } from './trend-lists/JoinedTrendList';
import { MyTrendList } from './trend-lists/MyTrendList';
import { NewTrendList } from './trend-lists/NewTrendList';
import { TopTrendList } from './trend-lists/TopTrendList';

export const LeftSidebar = async ({ className }: { className?: string }) => {
    return (
        <aside className={cn('w-80 xl:w-96 h-full hidden md:block sticky top-0 overflow-scroll', className)}>
            <ScrollArea className="p-4 px-1 flex flex-col">
                <TopTrendList />
                <NewTrendList />
                <MyTrendList />
                <JoinedTrendList />
            </ScrollArea>
        </aside>
    );
};

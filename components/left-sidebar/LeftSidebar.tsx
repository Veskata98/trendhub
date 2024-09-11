import { ScrollArea } from '../ui/scroll-area';
import { JoinedTrendList } from './trend-lists/JoinedTrendList';
import { MyTrendList } from './trend-lists/MyTrendList';
import { NewTrendList } from './trend-lists/NewTrendList';
import { TopTrendList } from './trend-lists/TopTrendList';

export const LeftSidebar = async () => {
    return (
        <aside className="w-80 xl:w-96 h-full hidden md:block sticky top-0 overflow-scroll">
            <ScrollArea className="p-4 px-1 flex flex-col overflow-scroll">
                <TopTrendList />
                <NewTrendList />
                <MyTrendList />
                <JoinedTrendList />
            </ScrollArea>
        </aside>
    );
};

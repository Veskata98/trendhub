import { cn } from '@/lib/utils';
import SearchFeed from './SearchFeed';
import SortFeed from './SortFeed';

export default function EditFeed({ className, isHomePage = false }: { className?: string; isHomePage?: boolean }) {
    return (
        <div className="px-2">
            <div
                className={cn(
                    `flex dark:bg-zinc-900/70 w-full 
                lg:w-[80%] xl:w-[75%] 2xl:w-[70%] mx-auto rounded-md p-1 
                justify-between items-center px-2`,
                    className
                )}
            >
                <SortFeed />
                <SearchFeed isHomePage={isHomePage} />
            </div>
        </div>
    );
}

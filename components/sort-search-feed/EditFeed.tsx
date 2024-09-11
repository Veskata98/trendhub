import SearchFeed from './SearchFeed';
import SortFeed from './SortFeed';

export default function EditFeed() {
    return (
        <div className="flex flex-col dark:bg-zinc-900/70 w-full lg:w-[80%] xl:w-[75%] 2xl:w-[70%] mx-auto rounded-md p-1 px-2">
            <div className="flex justify-between items-center">
                <SortFeed />
                <SearchFeed />
            </div>
        </div>
    );
}

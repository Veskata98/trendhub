import SearchFeed from './SearchFeed';
import SortFeed from './SortFeed';

export default function EditFeed() {
    return (
        <div className="flex flex-col dark:bg-zinc-900/70 w-full md:w-[70%] mx-auto rounded-md p-1 px-2">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <SortFeed />
                <SearchFeed />
            </div>
        </div>
    );
}

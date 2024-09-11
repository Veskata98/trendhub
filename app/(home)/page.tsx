import EditFeed from '@/components/sort-search-feed/EditFeed';
import { HomePageFeed } from '@/components/home-page/HomePageFeed';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Home({ searchParams }: { searchParams: { sort: string; search: string } }) {
    const searchTerm = searchParams.search;
    let sort = searchParams.sort;

    if (sort !== 'hot' && sort !== 'new' && sort !== 'top') {
        sort = 'hot';
    }

    return (
        <div className="w-full space-y-2 py-4 scroll-hidden">
            <EditFeed />
            <ScrollArea className="w-full px-2 md:px-4 lg:px-8 py-2 mx-auto">
                <HomePageFeed searchTerm={searchTerm} sort={sort as 'hot' | 'new' | 'top'} />
            </ScrollArea>
        </div>
    );
}

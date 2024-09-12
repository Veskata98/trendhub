import EditFeed from '@/components/sort-search-feed/EditFeed';
import { HomePageFeed } from '@/components/home-page/HomePageFeed';

export default async function Home({ searchParams }: { searchParams: { sort: string; search: string } }) {
    const searchTerm = searchParams.search;
    let sort = searchParams.sort;

    if (sort !== 'hot' && sort !== 'new' && sort !== 'top') {
        sort = 'hot';
    }

    return (
        <div className="w-full space-y-2 py-4 overflow-scroll scroll-hidden">
            <EditFeed isHomePage={true} />
            <HomePageFeed searchTerm={searchTerm} sort={sort as 'hot' | 'new' | 'top'} />
        </div>
    );
}

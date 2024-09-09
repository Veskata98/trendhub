import { HomePageFeed } from '@/components/home-page/home-page-post/HomePageFeed';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Home() {
    return (
        <ScrollArea className="w-full px-2 md:px-4 lg:px-8 py-2 mx-auto">
            <HomePageFeed />
        </ScrollArea>
    );
}

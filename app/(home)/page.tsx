import { HomePagePosts } from '@/components/home-page/home-page-post/HomePagePosts';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Home() {
    return (
        <ScrollArea className="w-full px-2 md:px-8 py-2 mx-auto">
            <HomePagePosts />
        </ScrollArea>
    );
}

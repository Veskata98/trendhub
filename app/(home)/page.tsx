import { PostsFetcher } from '@/components/home-page/home-page-post/PostsFetcher';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Home() {
    return (
        <ScrollArea className="w-full px-2 md:px-8 py-2 mx-auto">
            <PostsFetcher />
        </ScrollArea>
    );
}

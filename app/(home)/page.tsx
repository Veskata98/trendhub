import { getPosts } from '@/actions/infiniteScrollPost';
import { NewPosts } from '@/components/home-page/home-page-post/NewPosts';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Home() {
    const posts = await getPosts();

    return (
        <ScrollArea className="w-full px-2 md:px-8 py-4 mx-auto pt-2 md:pt-4">
            <NewPosts initialPosts={posts} />
        </ScrollArea>
    );
}

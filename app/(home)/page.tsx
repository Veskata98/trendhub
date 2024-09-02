import { getPosts } from '@/actions/infiniteScrollPost';
import { NewPosts } from '@/components/home-page/NewPosts';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Home() {
    const posts = await getPosts();

    return (
        <ScrollArea className="w-7/12 px-8 py-4 mx-auto">
            <NewPosts initialPosts={posts} />
        </ScrollArea>
    );
}

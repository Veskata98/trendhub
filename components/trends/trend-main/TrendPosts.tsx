import { ScrollArea } from '@/components/ui/scroll-area';
import { PostCard } from '@/components/posts/PostCard';
import { PostWithCreatorAndLikes } from '@/types';

type TrendPostsProps = {
    posts: PostWithCreatorAndLikes[];
};

export const TrendPosts = ({ posts }: TrendPostsProps) => {
    return (
        <ScrollArea>
            <div className="space-y-2">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </ScrollArea>
    );
};

'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { PostCard } from '@/components/posts/PostCard';
import { PostWithCreatorAvatarAndLikes } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getPostsWithCreator } from '@/actions/post-actions/infiniteScrollPost';

export const TrendPosts = ({
    trendName,
    initialPosts,
}: {
    trendName: string;
    initialPosts: PostWithCreatorAvatarAndLikes[];
}) => {
    const [posts, setPosts] = useState<PostWithCreatorAvatarAndLikes[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [ref, inView] = useInView();

    // Update state when initialPosts changes
    useEffect(() => {
        setPosts(initialPosts);
        setPage(1); // Reset page if initial posts change
        setHasMore(true); // Reset hasMore if initial posts change
    }, [initialPosts]);

    // Load more posts when in view and if more posts are available
    const loadMorePosts = useCallback(async () => {
        if (!hasMore) return; // Stop loading if no more posts

        const next = page + 1;
        const newPosts = await getPostsWithCreator(next, trendName);

        if (newPosts.length === 0) {
            setHasMore(false); // No more posts to load
        } else {
            setPage(next);
            setPosts((prev) => [...prev, ...newPosts]);
        }
    }, [page, hasMore, trendName]);

    useEffect(() => {
        if (inView && hasMore) {
            loadMorePosts();
        }
    }, [inView, loadMorePosts, hasMore]);

    return (
        <ScrollArea className="w-full px-0 py-4 mx-auto pt-2">
            <div className="space-y-2 flex flex-col items-center">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
                {hasMore && <div ref={ref}>Loading...</div>}
            </div>
        </ScrollArea>
    );
};

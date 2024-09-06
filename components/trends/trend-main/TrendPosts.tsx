'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { PostCard } from '@/components/posts/PostCard';
import { PostWithCreatorAvatarAndLikes } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getPostsWithCreator } from '@/actions/infiniteScrollPost';

type TrendPostsProps = {
    initialPosts: PostWithCreatorAvatarAndLikes[];
};

export const TrendPosts = ({ initialPosts }: TrendPostsProps) => {
    const [posts, setPosts] = useState(initialPosts);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [ref, inView] = useInView();

    // Load more posts when in view and if more posts are available
    const loadMorePosts = useCallback(async () => {
        if (!hasMore) return; // Stop loading if no more posts

        const next = page + 1;
        const newPosts = await getPostsWithCreator(next);

        if (newPosts.length === 0) {
            setHasMore(false); // No more posts to load
        } else {
            setPage(next);
            setPosts((prev) => [...prev, ...newPosts]);
        }
    }, [page, hasMore]);

    useEffect(() => {
        if (inView && hasMore) {
            loadMorePosts();
        }
    }, [inView, loadMorePosts, hasMore]);
    return (
        <ScrollArea className="w-full px-2 py-4 mx-auto pt-2">
            <div className="space-y-2 flex flex-col items-center">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
                {hasMore && <div ref={ref}>Loading...</div>}
            </div>
        </ScrollArea>
    );
};

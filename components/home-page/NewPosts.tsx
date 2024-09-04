'use client';

import { getPosts } from '@/actions/infiniteScrollPost';
import { PostCardHomePage } from './PostCardHomePage';
import { PostWithTrendAndLikes } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const NewPosts = ({ initialPosts }: { initialPosts: PostWithTrendAndLikes[] }) => {
    const [posts, setPosts] = useState(initialPosts);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [ref, inView] = useInView();

    // Load more posts when in view and if more posts are available
    const loadMorePosts = useCallback(async () => {
        if (!hasMore) return; // Stop loading if no more posts

        const next = page + 1;
        const newPosts = await getPosts(next);

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
        <div className="space-y-2 flex flex-col items-center">
            {posts.map((post) => (
                <PostCardHomePage key={post.id} post={post} />
            ))}
            {hasMore && <div ref={ref}>Loading...</div>}
        </div>
    );
};

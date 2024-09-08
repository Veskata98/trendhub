'use client';

import { getPostsWithTrend } from '@/actions/post-actions/infiniteScrollPost';
import { PostCardHomePage } from './PostCardHomePage';
import { ExtentedPost } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { downvotePost, upvotePost } from '@/actions/post-actions/postVoteActions';
import { updateVotes } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';

export const PostFeed = ({ initialPosts }: { initialPosts: ExtentedPost[] }) => {
    const [posts, setPosts] = useState<ExtentedPost[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [ref, inView] = useInView();

    const { user } = useUser();

    useEffect(() => {
        setPosts(initialPosts);
        setPage(1); // Reset page if initial posts change
        setHasMore(true); // Reset hasMore if initial posts change
    }, [initialPosts]);

    // Load more posts when in view and if more posts are available
    const loadMorePosts = useCallback(async () => {
        if (!hasMore) return; // Stop loading if no more posts

        const next = page + 1;
        const newPosts = await getPostsWithTrend(next);

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

    const handleUpvote = async (postId: string) => {
        const result = await upvotePost(postId);
        if (!result.success) return;
        setPosts((oldPosts) => updateVotes(oldPosts, postId, result.data, user?.username));
    };

    const handleDownvote = async (postId: string) => {
        const result = await downvotePost(postId);
        if (!result.success) return;
        setPosts((oldPosts) => updateVotes(oldPosts, postId, result.data, user?.username));
    };

    return (
        <div className="space-y-2 flex flex-col items-center">
            {posts.map((post) => (
                <PostCardHomePage
                    key={post.id}
                    post={post}
                    handleUpvote={handleUpvote}
                    handleDownvote={handleDownvote}
                />
            ))}
            {hasMore && <div ref={ref}>Loading...</div>}
        </div>
    );
};

'use client';

import { getPosts } from '@/actions/post-actions/getPosts';
import { ExtendedPost, PostCardPageType } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { downvotePost, upvotePost } from '@/actions/post-actions/postVoteActions';
import { updateVotes } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { PostCard } from './PostCard';

export const PostFeed = ({
    initialPosts,
    pageType,
    username,
    trendName,
    activity,
    searchTerm,
    sort = 'hot',
}: {
    initialPosts: ExtendedPost[];
    pageType: PostCardPageType;
    username?: string;
    trendName?: string;
    activity?: 'upvotes' | 'downvotes';
    searchTerm?: string;
    sort?: 'hot' | 'new' | 'top';
}) => {
    const [posts, setPosts] = useState<ExtendedPost[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [ref, inView] = useInView();

    const { user } = useUser();

    useEffect(() => {
        setPosts(initialPosts);
        setPage(1); // Reset page if initial posts change

        if (initialPosts.length < 10) {
            setHasMore(false);
        } else {
            setHasMore(true); // Reset hasMore if initial posts change
        }
    }, [initialPosts]);

    // Load more posts when in view and if more posts are available
    const loadMorePosts = useCallback(async () => {
        if (!hasMore) return; // Stop loading if no more posts

        const next = page + 1;
        const newPosts = await getPosts({
            page: next,
            username,
            trendName,
            activity,
            searchTerm,
            sort: pageType === 'profile' ? 'new' : sort,
        });

        if (newPosts.length === 0) {
            setHasMore(false); // No more posts to load
        } else {
            setPage(next);
            setPosts((prev) => [...prev, ...newPosts]);
        }
    }, [page, hasMore, username, activity, searchTerm, sort, pageType, trendName]);

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
        <div className="space-y-2 flex flex-col items-center mb-4 px-2">
            {posts.map((post) => (
                <PostCard
                    pageType={pageType}
                    key={post.id}
                    post={post}
                    handleUpvote={handleUpvote}
                    handleDownvote={handleDownvote}
                />
            ))}
            {hasMore && <Loader2 ref={ref} className="w-10 h-10 mt-12 text-zinc-500 animate-spin" />}
        </div>
    );
};

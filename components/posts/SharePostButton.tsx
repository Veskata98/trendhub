'use client';

import { Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const SharePostButton = ({ postId }: { postId: string }) => {
    const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL!}/post/${postId}`;

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(postUrl);
        toast.success('Post Url copied to clipboard');
    };

    return (
        <Button onClick={handleCopyClick} variant="ghost" size="sm" className="space-x-2">
            <Share2 className="h-4 w-4" />
            <span className="text-sm sm:text-base">Share</span>
        </Button>
    );
};

export default SharePostButton;

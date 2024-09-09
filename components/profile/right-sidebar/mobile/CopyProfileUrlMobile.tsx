'use client';

import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export const CopyProfileUrlMobileButton = ({ username }: { username: string }) => {
    const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL!}/profile/${username}`;

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(profileUrl);
        toast.success('Profile url copied to clipboard');
    };

    return (
        <div className="relative cursor-pointer select-none flex flex-col items-center" onClick={handleCopyClick}>
            <>
                <p className="font-semibold">{username}</p>
                <Copy className="absolute top-0 -right-5" width={16} height={16} />
            </>
            <span className="text-xs">copy url</span>
        </div>
    );
};

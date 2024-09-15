'use client';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export const ProfileName = ({ username }: { username: string }) => {
    const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL!}/profile/${username}`;

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(profileUrl);
        toast.success('Profile url copied to clipboard');
    };

    return (
        <div
            className="relative cursor-pointer select-none flex flex-col items-center lg:pointer-events-none"
            onClick={handleCopyClick}
        >
            <p className="font-semibold">{username}</p>
            <Copy className="absolute top-0 -right-5 lg:hidden" width={16} height={16} />
        </div>
    );
};

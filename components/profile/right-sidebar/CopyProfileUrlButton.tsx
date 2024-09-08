'use client';

import { Forward } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

export const CopyProfileUrlButton = () => {
    const params = useParams();

    const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL!}/profile/${params.username}`;

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(profileUrl);
        toast.success('Profile copied to clipboard');
    };

    return (
        <button
            onClick={handleCopyClick}
            className="flex gap-2 justify-center text-sm bg-primary-400
            hover:bg-opacity-70 bg-opacity-50 py-[6px] px-2 rounded-md
            font-semibold"
        >
            <Forward />
            Share Profile
        </button>
    );
};

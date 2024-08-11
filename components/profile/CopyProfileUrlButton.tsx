'use client';
import { Forward } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useToast } from '../ui/use-toast';

export const CopyProfileUrlButton = () => {
    const { toast } = useToast();
    const path = usePathname();
    const profileUrl = process.env.NEXT_PUBLIC_BASE_URL + path;

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(profileUrl);
        toast({
            className: 'bg-primary-500 text-white',
            duration: 1000,
            title: 'Profile copied to clipboard ',
        });
    };

    return (
        <button onClick={handleCopyClick} className="flex gap-2 justify-center text-sm">
            <Forward />
            Share Profile
        </button>
    );
};

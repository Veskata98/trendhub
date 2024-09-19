'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ReturnButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    };

    return (
        <Button
            onClick={handleClick}
            variant="ghost"
            className="hidden xl:block absolute -left-16 top-0 hover:bg-transparent"
        >
            <ArrowLeft className="hover:text-zinc-600 dark:hover:text-zinc-200" />
        </Button>
    );
};

export default ReturnButton;

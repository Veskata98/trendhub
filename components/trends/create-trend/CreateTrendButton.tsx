'use client';

import { Button } from '../../ui/button';
import { Plus } from 'lucide-react';
import { useModal } from '@/hooks/useModalStore';

export const CreateTrendButton = ({ smallDisplay }: { smallDisplay?: boolean }) => {
    const { onOpen } = useModal();
    if (smallDisplay) {
        return (
            <Button
                onClick={() => onOpen('createTrend')}
                className=" px-0 w-full flex gap-2 items-center h-12 justify-center sm:justify-start font-normal"
            >
                <Plus width={16} height={16} />
                <span>Create Trend</span>
            </Button>
        );
    }

    return (
        <Button
            onClick={() => onOpen('createTrend')}
            className="p-3 flex items-center gap-2 bg-zinc-500/30 rounded-3xl hover:bg-zinc-500/50"
        >
            <span className="hidden md:block">Create</span>
            <Plus width={16} height={16} />
        </Button>
    );
};

'use client';

import { ReactNode, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { CreateTrendModal } from './CreateTrendModal';

export const CreateTrend = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="p-3 flex items-center gap-2 bg-zinc-500/30 rounded-3xl hover:bg-zinc-500/50"
            >
                <span className="hidden md:block">Create</span>
                <Plus width={16} height={16} />
            </Button>

            <CreateTrendModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

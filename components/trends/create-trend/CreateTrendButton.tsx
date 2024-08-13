import React from 'react';
import { Button } from '../../ui/button';
import { Plus } from 'lucide-react';

export const CreateTrendButton = ({ onOpen }: { onOpen: () => void }) => {
    return (
        <Button
            onClick={onOpen}
            className="p-3 flex items-center gap-2 bg-zinc-500/30 rounded-3xl hover:bg-zinc-500/50"
        >
            <span className="hidden md:block">Create</span>
            <Plus width={16} height={16} />
        </Button>
    );
};

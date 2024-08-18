import React from 'react';
import { Button } from '../../ui/button';

export const CreatePostButton = ({ onOpen }: { onOpen: () => void }) => {
    return (
        <Button
            onClick={onOpen}
            className="flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-600 rounded-md"
        >
            <p>Add post</p>
        </Button>
    );
};

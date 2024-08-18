'use client';

import { useState } from 'react';
import { CreatePostModal } from './CreatePostModal';
import { CreatePostButton } from './CreatePostButton';

export const CreatePost = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <CreatePostButton onOpen={onOpen} />
            <CreatePostModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

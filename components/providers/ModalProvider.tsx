'use client';

import { useEffect, useState } from 'react';
import { CreateTrendModal } from '../modals/CreateTrendModal';
import { CreatePostModal } from '../modals/CreatePostModal';

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateTrendModal />
            <CreatePostModal />
        </>
    );
};
